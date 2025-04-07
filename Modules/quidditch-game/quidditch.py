import pygame
import sys
import random
import math

# Initialize pygame and mixer
pygame.init()
pygame.mixer.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Harry Potter Quidditch")

# Colors
BLUE = (0, 105, 148)  # Sky background
GOLD = (255, 215, 0)   # Snitch and hoops
RED = (255, 0, 0)      # Quaffle and health bar
GREEN = (0, 128, 0)    # Slytherin team
BLACK = (0, 0, 0)      # Bludgers
WHITE = (255, 255, 255) # Text and UI elements

# Fonts
font = pygame.font.SysFont("Arial", 24)
large_font = pygame.font.SysFont("Arial", 48)

# Clock for controlling frame rate
clock = pygame.time.Clock()
FPS = 60

# Sound effects dummy class with proper argument handling
class DummySound:
    def play(self, loops=0): 
        pass  # Accepts but ignores loops parameter

# Initialize sound objects
catch_sound = DummySound()
score_sound = DummySound()
bludger_hit_sound = DummySound()
background_music = DummySound()

try:
    catch_sound = pygame.mixer.Sound("sounds/catch.wav")
    score_sound = pygame.mixer.Sound("sounds/score.wav")
    bludger_hit_sound = pygame.mixer.Sound("sounds/bludger_hit.wav")
    background_music = pygame.mixer.Sound("sounds/background.mp3")
    print("Sound files loaded successfully")
except Exception as e:
    print(f"Warning: Sound files not found. Continuing without sound. Error: {e}")

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Create a simple broomstick image
        self.original_image = pygame.Surface((40, 20), pygame.SRCALPHA)
        pygame.draw.rect(self.original_image, (139, 69, 19), (0, 5, 30, 10))  # broom handle
        pygame.draw.polygon(self.original_image, (160, 82, 45), 
                          [(30, 0), (40, 10), (30, 20)])  # broom head
        self.image = self.original_image
        self.rect = self.image.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        self.speed = 5
        self.angle = 0
        
    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= self.speed
            self.angle = 180
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed
            self.angle = 0
        if keys[pygame.K_UP]:
            self.rect.y -= self.speed
            self.angle = 90
        if keys[pygame.K_DOWN]:
            self.rect.y += self.speed
            self.angle = 270
            
        if any(keys[k] for k in [pygame.K_LEFT, pygame.K_RIGHT, pygame.K_UP, pygame.K_DOWN]):
            self.image = pygame.transform.rotate(self.original_image, self.angle)
            self.rect = self.image.get_rect(center=self.rect.center)
        
        # Keep player on screen
        self.rect.x = max(0, min(self.rect.x, SCREEN_WIDTH - self.rect.width))
        self.rect.y = max(0, min(self.rect.y, SCREEN_HEIGHT - self.rect.height))

class Bludger(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Create a simple bludger image
        self.image = pygame.Surface((30, 30), pygame.SRCALPHA)
        pygame.draw.circle(self.image, BLACK, (15, 15), 15)
        pygame.draw.circle(self.image, (50, 50, 50), (15, 15), 10)
        self.rect = self.image.get_rect()
        self.reset_position()
        self.speed_x = random.choice([-3, -2, 2, 3])
        self.speed_y = random.choice([-3, -2, 2, 3])
        
    def reset_position(self):
        self.rect.x = random.randint(0, max(0, SCREEN_WIDTH - self.rect.width))
        self.rect.y = random.randint(0, max(0, SCREEN_HEIGHT - self.rect.height))
        
    def update(self):
        self.rect.x += self.speed_x
        self.rect.y += self.speed_y
        
        # Bounce off edges
        if self.rect.left <= 0 or self.rect.right >= SCREEN_WIDTH:
            self.speed_x *= -1
        if self.rect.top <= 0 or self.rect.bottom >= SCREEN_HEIGHT:
            self.speed_y *= -1

class Snitch(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Create a simple golden snitch image
        self.image = pygame.Surface((20, 20), pygame.SRCALPHA)
        pygame.draw.circle(self.image, GOLD, (10, 10), 10)
        pygame.draw.line(self.image, GOLD, (0, 10), (20, 10), 2)
        pygame.draw.line(self.image, GOLD, (10, 0), (10, 20), 2)
        self.rect = self.image.get_rect()
        self.reset_position()
        self.speed = 3  # Faster than original
        self.direction = random.choice(["up", "down", "left", "right"])
        self.counter = 0
        self.wing_pos = 0
        self.wing_direction = 1
        
    def reset_position(self):
        self.rect.x = random.randint(0, max(0, SCREEN_WIDTH - self.rect.width))
        self.rect.y = random.randint(0, max(0, SCREEN_HEIGHT - self.rect.height))
        
    def update(self):
        # Wing animation
        self.wing_pos += 0.2 * self.wing_direction  # Faster wing animation
        if abs(self.wing_pos) > 5:
            self.wing_direction *= -1
            
        self.counter += 1
        if self.counter > 30:  # Change direction more frequently
            self.direction = random.choice(["up", "down", "left", "right"])
            self.counter = 0
            
        if self.direction == "up":
            self.rect.y -= self.speed
        elif self.direction == "down":
            self.rect.y += self.speed
        elif self.direction == "left":
            self.rect.x -= self.speed
        elif self.direction == "right":
            self.rect.x += self.speed
            
        # Wrap around screen
        if self.rect.right < 0:
            self.rect.left = SCREEN_WIDTH
        if self.rect.left > SCREEN_WIDTH:
            self.rect.right = 0
        if self.rect.bottom < 0:
            self.rect.top = SCREEN_HEIGHT
        if self.rect.top > SCREEN_HEIGHT:
            self.rect.bottom = 0

class Quaffle(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Create a simple quaffle image
        self.image = pygame.Surface((25, 25), pygame.SRCALPHA)  # Slightly smaller
        pygame.draw.circle(self.image, RED, (12, 12), 12)
        pygame.draw.line(self.image, (200, 0, 0), (2, 12), (22, 12), 2)
        pygame.draw.line(self.image, (200, 0, 0), (12, 2), (12, 22), 2)
        self.rect = self.image.get_rect(center=(SCREEN_WIDTH // 4, SCREEN_HEIGHT // 2))
        self.held = False
        self.velocity = [0, 0]
        self.gravity = 0.15  # Reduced gravity
        self.bounce = 0.7    # More bouncy
        
    def update(self):
        if not self.held:
            self.rect.x += self.velocity[0]
            self.rect.y += self.velocity[1]
            self.velocity[1] += self.gravity
            
            # Bounce off edges
            if self.rect.left <= 0 or self.rect.right >= SCREEN_WIDTH:
                self.velocity[0] *= -self.bounce
                self.rect.x = max(0, min(self.rect.x, SCREEN_WIDTH - self.rect.width))
            if self.rect.bottom >= SCREEN_HEIGHT:
                self.velocity[1] *= -self.bounce
                self.rect.bottom = SCREEN_HEIGHT
                
            # Slow down over time
            self.velocity[0] *= 0.98
            self.velocity[1] *= 0.98

class Opponent(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        # Create a simple opponent image
        self.image = pygame.Surface((35, 35), pygame.SRCALPHA)
        pygame.draw.circle(self.image, GREEN, (17, 17), 17)
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.speed = 2.5  # Slightly faster
        self.target = None
        self.quaffle = None
        
    def set_quaffle(self, quaffle):
        self.quaffle = quaffle
        
    def update(self):
        if self.quaffle and not self.quaffle.held:
            if self.target is None or random.random() < 0.03:  # More frequent target updates
                self.target = self.quaffle.rect.center
                
            if self.target:
                dx = self.target[0] - self.rect.centerx
                dy = self.target[1] - self.rect.centery
                dist = max(1, math.sqrt(dx*dx + dy*dy))
                self.rect.x += self.speed * dx / dist
                self.rect.y += self.speed * dy / dist
                
                if random.random() < 0.02:  # More frequent target changes
                    self.target = None

class GameState:
    def __init__(self):
        self.current_state = "MENU"
        self.score = 0
        self.health = 100
        self.time_left = 6000  # 100 seconds at 60 FPS
        
    def handle_events(self, events):
        if self.current_state == "MENU":
            for event in events:
                if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                    self.current_state = "PLAYING"
                    self.reset_game()
                elif event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                    return False  # Signal to quit
        elif self.current_state == "GAME_OVER":
            for event in events:
                if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                    self.current_state = "MENU"
                elif event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                    return False  # Signal to quit
        return True
        
    def reset_game(self):
        self.score = 0
        self.health = 100
        self.time_left = 6000
        background_music.play(-1)
        
    def draw(self, screen):
        if self.current_state == "MENU":
            title = large_font.render("Harry Potter Quidditch", True, GOLD)
            instruction = font.render("Press ENTER to Start", True, WHITE)
            exit_text = font.render("Press ESC to Quit", True, WHITE)
            screen.blit(title, (SCREEN_WIDTH//2 - title.get_width()//2, 100))
            screen.blit(instruction, (SCREEN_WIDTH//2 - instruction.get_width()//2, 300))
            screen.blit(exit_text, (SCREEN_WIDTH//2 - exit_text.get_width()//2, 350))
            
        elif self.current_state == "GAME_OVER":
            game_over = large_font.render("Game Over", True, RED)
            score_text = font.render(f"Final Score: {self.score}", True, WHITE)
            restart = font.render("Press ENTER to Return to Menu", True, WHITE)
            exit_text = font.render("Press ESC to Quit", True, WHITE)
            screen.blit(game_over, (SCREEN_WIDTH//2 - game_over.get_width()//2, 100))
            screen.blit(score_text, (SCREEN_WIDTH//2 - score_text.get_width()//2, 200))
            screen.blit(restart, (SCREEN_WIDTH//2 - restart.get_width()//2, 300))
            screen.blit(exit_text, (SCREEN_WIDTH//2 - exit_text.get_width()//2, 350))

def draw_hoop(x, y, screen):
    # More detailed hoop drawing
    pygame.draw.rect(screen, GOLD, (x, y, 10, 50), 3)
    pygame.draw.rect(screen, GOLD, (x + 40, y, 10, 50), 3)
    pygame.draw.rect(screen, GOLD, (x, y, 50, 10), 3)
    pygame.draw.rect(screen, GOLD, (x, y + 40, 50, 10), 3)

def main():
    game_state = GameState()
    
    # Create sprites
    player = Player()
    bludgers = pygame.sprite.Group()
    for _ in range(2):
        bludgers.add(Bludger())
    
    snitch = Snitch()
    quaffle = Quaffle()
    
    opponents = pygame.sprite.Group()
    for i in range(3):
        opponent = Opponent(random.randint(0, SCREEN_WIDTH//2), 
                          random.randint(0, SCREEN_HEIGHT))
        opponent.set_quaffle(quaffle)
        opponents.add(opponent)
    
    all_sprites = pygame.sprite.Group()
    all_sprites.add(player)
    all_sprites.add(bludgers)
    all_sprites.add(snitch)
    all_sprites.add(quaffle)
    all_sprites.add(opponents)
    
    # Weather effects
    weather_drops = []
    for _ in range(80):  # Fewer drops for better performance
        weather_drops.append([
            random.randint(0, SCREEN_WIDTH),
            random.randint(-100, SCREEN_HEIGHT),
            random.randint(2, 5)
        ])
    wind = 0
    
    running = True
    while running:
        events = pygame.event.get()
        
        # Handle events and check if we should quit
        if not game_state.handle_events(events):
            running = False
        
        for event in events:
            if event.type == pygame.QUIT:
                running = False
        
        screen.fill(BLUE)
        
        if game_state.current_state == "PLAYING":
            # Update weather
            if random.random() < 0.01:
                wind = random.uniform(-1.5, 1.5)  # More variable wind
                
            for drop in weather_drops:
                drop[1] += drop[2]
                drop[0] += wind
                if drop[1] > SCREEN_HEIGHT or drop[0] < -10 or drop[0] > SCREEN_WIDTH + 10:
                    drop[1] = random.randint(-100, -10)
                    drop[0] = random.randint(0, SCREEN_WIDTH)
                pygame.draw.line(screen, (200, 200, 255), 
                               (drop[0], drop[1]), 
                               (drop[0], drop[1]+drop[2]//2), 1)
            
            # Update game state
            game_state.time_left -= 1
            if game_state.time_left <= 0:
                game_state.current_state = "GAME_OVER"
                background_music.stop()
            
            # Handle key presses
            keys = pygame.key.get_pressed()
            if keys[pygame.K_SPACE]:
                if not quaffle.held and pygame.sprite.collide_rect(player, quaffle):
                    quaffle.held = True
                    catch_sound.play()
                elif quaffle.held:
                    quaffle.held = False
                    angle_rad = math.radians(player.angle)
                    # More powerful throw
                    quaffle.velocity = [
                        12 * math.cos(angle_rad),
                        -12 * math.sin(angle_rad)
                    ]
            
            # Update all game objects
            player.update()
            bludgers.update()
            snitch.update()
            quaffle.update()
            opponents.update()
            
            if quaffle.held:
                quaffle.rect.center = player.rect.center
            else:
                quaffle.velocity[0] += wind * 0.15  # More wind effect
            
            # Check for collisions
            if pygame.sprite.spritecollide(player, bludgers, False):
                game_state.health -= 0.3  # Reduced damage
                bludger_hit_sound.play()
                if game_state.health <= 0:
                    game_state.current_state = "GAME_OVER"
                    background_music.stop()
            
            if pygame.sprite.collide_rect(player, snitch):
                game_state.score += 150
                catch_sound.play()
                snitch.kill()
                snitch = Snitch()
                all_sprites.add(snitch)
            
            # Scoring detection with improved collision
            if not quaffle.held:
                # Left hoop (scoring area)
                left_hoop_rect = pygame.Rect(50, 200, 50, 60)
                if left_hoop_rect.collidepoint(quaffle.rect.center):
                    if quaffle.velocity[0] < -2:  # Must be moving left with some speed
                        game_state.score += 10
                        score_sound.play()
                        quaffle.rect.center = (SCREEN_WIDTH // 4, SCREEN_HEIGHT // 2)
                        quaffle.velocity = [0, 0]
                
                # Right hoop (scoring area)
                right_hoop_rect = pygame.Rect(SCREEN_WIDTH-100, 200, 50, 60)
                if right_hoop_rect.collidepoint(quaffle.rect.center):
                    if quaffle.velocity[0] > 2:  # Must be moving right with some speed
                        game_state.score += 10
                        score_sound.play()
                        quaffle.rect.center = (SCREEN_WIDTH // 4, SCREEN_HEIGHT // 2)
                        quaffle.velocity = [0, 0]
            
            # Draw hoops
            draw_hoop(50, 200, screen)
            draw_hoop(SCREEN_WIDTH - 100, 200, screen)
            
            # Draw all sprites
            all_sprites.draw(screen)
            
            # Draw HUD with improved layout
            # Health bar with outline
            pygame.draw.rect(screen, (70, 70, 70), (8, 48, 104, 24))
            pygame.draw.rect(screen, RED, (10, 50, game_state.health, 20))
            pygame.draw.rect(screen, WHITE, (10, 50, 100, 20), 2)
            
            # Score display
            score_text = font.render(f"Score: {game_state.score}", True, WHITE)
            screen.blit(score_text, (10, 10))
            
            # Time remaining with better formatting
            minutes = game_state.time_left // 3600
            seconds = (game_state.time_left % 3600) // 60
            time_text = font.render(f"Time: {minutes:01d}:{seconds:02d}", True, WHITE)
            screen.blit(time_text, (SCREEN_WIDTH - 150, 10))
            
            # Health text
            health_text = font.render(f"Health: {int(game_state.health)}%", True, WHITE)
            screen.blit(health_text, (120, 50))
        
        # Draw game state (menu or game over)
        game_state.draw(screen)
        
        pygame.display.flip()
        clock.tick(FPS)
    
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()