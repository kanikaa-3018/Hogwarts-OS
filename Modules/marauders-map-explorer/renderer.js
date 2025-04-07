const { invokeLLM } = require('./aiAgent');
const { shell, ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const pdf = require('pdf-parse');
let selectedFilePath = '';
let userXP = parseInt(localStorage.getItem('userXP')) || 0;
let currentPath = require('os').homedir();
let historyStack = [];
const fileViewer = document.getElementById('file-viewer');
const breadcrumb = document.getElementById('breadcrumb');
const sidebar = document.getElementById('sidebar');
const xpDisplay = document.getElementById("xp-display");
const xpBar = document.getElementById("xp-bar");

window.addEventListener("DOMContentLoaded", () => {
    const sidebarElement = document.getElementById("sidebar");
    if (!sidebarElement) {
        console.error("Sidebar container not found!");
        return;
    }

    historyStack.push(currentPath); // Add home to history for back to work initially
    loadSidebar(require('os').homedir(), sidebarElement);
    loadFiles(currentPath);
});

// 📂 Load Sidebar Directory Tree
function loadSidebar(dirPath, parentElement) {
    parentElement.innerHTML = ''; // Clear sidebar before reloading

    function createSidebarItem(folderPath, folderName, parent) {
        let container = document.createElement('div');
        container.classList.add('sidebar-folder');

        let folderToggle = document.createElement('span');
        folderToggle.textContent = "▶"; // Collapsed state
        folderToggle.classList.add('folder-toggle');

        let folderElement = document.createElement('span');
        folderElement.textContent = "📂 " + folderName;
        folderElement.classList.add('folder-name');
        folderElement.dataset.path = folderPath;

        let subFolderContainer = document.createElement('div');
        subFolderContainer.classList.add('sidebar-subfolders');
        subFolderContainer.style.display = "none"; // Hidden by default

        folderToggle.onclick = () => {
            if (subFolderContainer.style.display === "none") {
                subFolderContainer.style.display = "block";
                folderToggle.textContent = "▼"; // Expanded state
                loadSubFolders(folderPath, subFolderContainer);
            } else {
                subFolderContainer.style.display = "none";
                folderToggle.textContent = "▶"; // Collapsed state
            }
        };

        folderElement.onclick = () => {
            loadFiles(folderPath);
        };

        container.appendChild(folderToggle);
        container.appendChild(folderElement);
        container.appendChild(subFolderContainer);
        parent.appendChild(container);
    }

    function loadSubFolders(folderPath, parent) {
        parent.innerHTML = '';
        fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
            if (err) return console.error("Error loading subfolders:", err);
            files.filter(file => file.isDirectory()).forEach(subDir => {
                createSidebarItem(path.join(folderPath, subDir.name), subDir.name, parent);
            });
        });
    }

    createSidebarItem(require('os').homedir(), "Home", parentElement);
}

function updateBreadcrumb(dirPath) {
    breadcrumb.innerHTML = '';
    const parts = dirPath.split(path.sep);
    let fullPath = '';

    parts.forEach((part, index) => {
        if (!part) return;
        fullPath += (index === 0 && process.platform === 'win32') ? part : path.sep + part;

        const span = document.createElement('span');
        span.textContent = part;
        span.style.cursor = 'pointer';
        span.style.marginRight = '5px';
        span.onclick = () => loadFiles(fullPath);

        breadcrumb.appendChild(span);
        if (index < parts.length - 1) breadcrumb.appendChild(document.createTextNode(' / '));
    });
}

// 📂 Load Files in Main Explorer
async function loadFiles(dirPath) {
    fileViewer.innerHTML = '';
    updateBreadcrumb(dirPath);
    currentPath = dirPath;

    if (!localStorage.getItem(dirPath)) {
        userXP += 5;
        updateXP(false);
        localStorage.setItem(dirPath, 'visited');
    }

    try {
        let files = await fs.readdir(dirPath, { withFileTypes: true });
        let fileList = await Promise.all(files.map(async (file) => {
            let filePath = path.join(dirPath, file.name);
            let stats = await fs.stat(filePath);
            return {
                name: file.name,
                path: filePath,
                isDirectory: file.isDirectory(),
                size: stats.size,
                modified: stats.mtimeMs,
                type: file.isDirectory() ? "folder" : path.extname(file.name).toLowerCase()
            };
        }));

        let sortOption = document.getElementById("sort-options").value;
        fileList = sortFiles(fileList, sortOption);

        fileList.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = file.name;
            fileElement.classList.add('file-item');
            fileElement.dataset.type = file.type;

            if (file.isDirectory) {
                fileElement.classList.add('folder-item');
                fileElement.textContent = "📂 " + file.name;
                fileElement.onclick = () => {
                    historyStack.push(currentPath);
                    fileElement.classList.add('hidden-passage');
                    setTimeout(() => loadFiles(file.path), 500);
                };
            } else {
                fileElement.ondblclick = () => openFile(file.path);
                fileElement.draggable = true;
                fileElement.ondragstart = (e) => {
                    e.dataTransfer.setData('text/plain', file.path);
                };

                fileElement.onmouseenter = () => {
                    if (fileElement.querySelector('.file-preview')) return;
                    if (file.type === ".txt" || file.type === ".md") {
                        fs.readFile(file.path, 'utf-8', (err, data) => {
                            if (err) return;
                            const preview = document.createElement('div');
                            preview.classList.add('file-preview');
                            preview.textContent = data.slice(0, 200);
                            fileElement.appendChild(preview);
                        });
                    }
                };

                fileElement.onmouseleave = () => {
                    const preview = fileElement.querySelector('.file-preview');
                    if (preview) fileElement.removeChild(preview);
                };
            }

            fileElement.oncontextmenu = (e) => {
                e.preventDefault();
                selectedFilePath = file.path;
                ipcRenderer.invoke('show-context-menu');
            };

            fileViewer.appendChild(fileElement);
        });

    } catch (err) {
        console.error("Error loading files:", err);
    }
}

// 📌 Sorting Function
function sortFiles(files, sortOption) {
    return files.sort((a, b) => {
        switch (sortOption) {
            case "name-asc": return a.name.localeCompare(b.name);
            case "name-desc": return b.name.localeCompare(a.name);
            case "size-asc": return a.size - b.size;
            case "size-desc": return b.size - a.size;
            case "date-asc": return a.modified - b.modified;
            case "date-desc": return b.modified - a.modified;
            case "type": return (b.isDirectory - a.isDirectory) || a.name.localeCompare(b.name);
            default: return 0;
        }
    });
}

// 🎮 Update XP Display & Bar
function updateXP(reload = true) {
    let previousXP = parseInt(localStorage.getItem('userXP')) || 0;
    xpDisplay.textContent = `XP: ${userXP}`;
    localStorage.setItem('userXP', userXP);

    let levelXP = 500;
    let progress = (userXP % levelXP) / levelXP * 100;
    xpBar.style.width = `${progress}%`;

    if (reload) {
        setTimeout(() => loadFiles(currentPath), 200);
    }

    if (previousXP < 100 && userXP >= 100) alert("✨ You unlocked the 'Restricted Section'!");
    if (previousXP < 250 && userXP >= 250) alert("🔮 You discovered the 'Room of Requirement'!");
    if (previousXP < 500 && userXP >= 500) alert("🐍 You gained access to the 'Chamber of Secrets'!");
}

// 🔙 Back Button
document.getElementById('back-btn').addEventListener('click', () => {
    console.log("History stack:", historyStack);
    if (historyStack.length > 0) {
        const prevPath = historyStack.pop();
        console.log("Going back to:", prevPath);
        loadFiles(prevPath);
    } else {
        console.log("No history to go back to.");
    }
});

// 🔍 Search Bar
let searchTimeout;
document.getElementById('search-bar').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.file-item').forEach(file => {
            file.style.display = file.textContent.toLowerCase().includes(query) ? 'block' : 'none';
        });
    }, 200);
});

// 🌙 Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
});

// 🧮 Sorting Change
document.getElementById("sort-options").addEventListener("change", () => {
    loadFiles(currentPath);
});

// ⏳ Time-Based XP Gain
setInterval(() => {
    userXP += 1;
    updateXP(false);
}, 60000);


document.getElementById('cast-btn').addEventListener('click', async () => {
    const input = document.getElementById('spell-input').value.trim();
    const outputBox = document.getElementById('spell-output');
    if (!input) return;

    outputBox.textContent = "✨ Casting spells...";

    // Split commands using "then", "and", or ","
    const spellCommands = input.split(/\b(?:then|and|,)\b/i).map(cmd => cmd.trim());

    let finalOutput = "";

    for (const spell of spellCommands) {
        let result = await processSpell(spell);
        finalOutput += `\n🧙‍♂️ ${spell}:\n${result}\n`;
    }

    outputBox.textContent = finalOutput;
});



async function processSpell(input) {
    if (/\bconvert\b/i.test(input)) {
        const convertMatch = input.match(/convert\s+["']?([\w\s\-.]+\.\w+)["']?\s+to\s+(\w+)/i);
        if (!convertMatch) return "🧙‍♂️ Please specify the format (e.g., 'convert \"data.csv\" to JSON').";

        const [, fileName, targetFormat] = convertMatch;
        const filePath = path.join(currentPath, fileName);
        const ext = path.extname(fileName).toLowerCase();
        const baseName = path.basename(fileName, ext);
        const destFormat = targetFormat.toLowerCase();
        const destPath = path.join(currentPath, `${baseName}.${destFormat}`);

        try {
            if (ext === '.csv' && destFormat === 'json') {
                const csvData = await fs.readFile(filePath, 'utf-8');
                const [headerLine, ...lines] = csvData.split('\n');
                const headers = headerLine.split(',');
                const jsonData = lines.map(line => {
                    const values = line.split(',');
                    return headers.reduce((acc, header, i) => {
                        acc[header] = values[i] || "";
                        return acc;
                    }, {});
                });
                await fs.writeFile(destPath, JSON.stringify(jsonData, null, 2));
                return `✅ Converted "${fileName}" ➜ "${baseName}.json"`;

            } else if (ext === '.json' && destFormat === 'csv') {
                const jsonData = JSON.parse(await fs.readFile(filePath, 'utf-8'));
                if (!Array.isArray(jsonData)) throw new Error("JSON must be an array of objects.");
                const headers = Object.keys(jsonData[0]);
                const csvLines = [
                    headers.join(','),
                    ...jsonData.map(obj => headers.map(h => obj[h]).join(','))
                ];
                await fs.writeFile(destPath, csvLines.join('\n'));
                return `✅ Converted "${fileName}" ➜ "${baseName}.csv"`;

            } else if (ext === '.pdf' && destFormat === 'txt') {
                const pdfBuffer = await fs.readFile(filePath);
                const pdfData = await pdf(pdfBuffer);
                await fs.writeFile(destPath, pdfData.text);
                return `✅ Converted "${fileName}" ➜ "${baseName}.txt"`;

            } else if (ext === '.md' && destFormat === 'html') {
                const markdown = await fs.readFile(filePath, 'utf-8');
                const html = `<html><body>${markdown.replace(/\n/g, '<br>')}</body></html>`;
                await fs.writeFile(destPath, html);
                return `✅ Converted "${fileName}" ➜ "${baseName}.html"`;

            } else if (ext === '.txt' && destFormat === 'pdf') {
                const text = await fs.readFile(filePath, 'utf-8');
                const PDFDocument = require('pdfkit');
                const doc = new PDFDocument();
                const writeStream = fs.createWriteStream(destPath);
                doc.pipe(writeStream);
                doc.fontSize(12).text(text);
                doc.end();
                await new Promise(resolve => writeStream.on('finish', resolve));
                return `✅ Converted "${fileName}" ➜ "${baseName}.pdf"`;

            } else {
                return `⚠ Unsupported conversion: "${ext}" ➜ "${destFormat}".\n\n🧙‍♂️ Supported conversions:\n- CSV ↔ JSON\n- PDF ➜ TXT\n- MD ➜ HTML\n- TXT ➜ PDF`;
            }
        } catch (err) {
            console.error("Conversion error:", err);
            return `❌ Failed to convert "${fileName}" ➜ "${destFormat}"`;
        }
    }

    // Fallback for spell commands on files
    const fileMentionRegex = /(?:summarize|explain|analyze|read|open|rewrite|fix|optimize|convert)\s+["']?([\w\s\-.]+\.\w+)["']?/i;
    const match = input.match(fileMentionRegex);
    let prompt = input.trim();

    // 📁 Folder summarization
    if (input.toLowerCase().includes("summarize") && input.toLowerCase().includes("folder")) {
        try {
            const files = await fs.readdir(currentPath, { withFileTypes: true });
            const fileSummary = await Promise.all(files.map(async file => {
                const stats = await fs.stat(path.join(currentPath, file.name));
                return `${file.isDirectory() ? "📁 Folder" : "📄 File"}: ${file.name} (${stats.size} bytes)`;
            }));
            return `📂 Folder contents:\n${fileSummary.join('\n')}`;
        } catch (err) {
            console.error("Folder read error:", err);
            return "🧙‍♂️ Spell failed to read folder data!";
        }
    }

    // 📄 File summarization / rewriting / optimization
    if (match) {
        const fileName = match[1];
        const filePath = path.join(currentPath, fileName);
        const ext = path.extname(fileName).toLowerCase();

        try {
            let fileContent = '';

            if (['.txt', '.md', '.js', '.py', '.json', '.html', '.css', '.ts'].includes(ext)) {
                fileContent = await fs.readFile(filePath, 'utf-8');
            } else if (ext === '.csv') {
                fileContent = (await fs.readFile(filePath, 'utf-8')).slice(0, 4000);
            } else if (ext === '.pdf') {
                const pdfBuffer = await fs.readFile(filePath);
                const pdfData = await pdf(pdfBuffer);
                fileContent = pdfData.text.slice(0, 4000) || "[No readable text found in PDF]";
            } else {
                fileContent = "[Binary or unsupported file type]";
            }

            if (/\b(summarize|explain|analyze)\b/i.test(input)) {
                return await invokeLLM(`Summarize the following content of "${fileName}":\n${fileContent}`);
            }

            if (/\b(rewrite|fix|optimize)\b/i.test(input)) {
                const aiResponse = await invokeLLM(`${input}\n\nHere is the original content of "${fileName}":\n${fileContent}\n\nProvide the rewritten version:`);
                if (aiResponse && aiResponse.trim()) {
                    await fs.writeFile(filePath, aiResponse, 'utf-8');
                    return `✅ "${fileName}" has been successfully updated!`;
                } else {
                    return `⚠ AI didn't generate a valid rewrite for "${fileName}".`;
                }
            }
        } catch (err) {
            console.error("File read error:", err);
            return `🧙‍♂️ Couldn't read "${fileName}". Check if it's here.`;
        }
    }

    // 🧠 General AI spell
    try {
        return await invokeLLM(prompt);
    } catch (err) {
        console.error("LLM invocation error:", err);
        return "🧙‍♂️ Spell misfired while talking to the AI!";
    }
}
