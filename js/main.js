// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
});

document.querySelectorAll('.skills, .hobby, .Orgs').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', function() {
    VanillaTilt.init(document.querySelectorAll(".skills1, .skills2"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });
});

// Optional: Add scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollProgress * 100}%`;
    }
});

function createParticles() {
  const title = document.querySelector('.Title');
  // Reduce number of particles from 75 to 30
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 15 + 5}px; // Reduced max size
      height: ${Math.random() * 15 + 5}px; // Reduced max size
      background: rgba(104, 244, 165, ${Math.random() * 0.3 + 0.1}); // Reduced opacity
      box-shadow: 0 0 ${Math.random() * 5 + 3}px rgba(104, 244, 165, 0.6); // Reduced glow
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      z-index: 1;
    `;
    title.appendChild(particle);
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const animation = particle.animate([
    { 
      transform: 'translate(0, 0) scale(1)',
      opacity: Math.random() * 0.3 + 0.3 // Reduced opacity range
    },
    { 
      transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${Math.random() * 0.3 + 0.5})`, // Reduced movement range
      opacity: Math.random() * 0.2 + 0.1
    }
  ], {
    duration: 4000 + Math.random() * 3000, // Reduced animation duration
    direction: 'alternate',
    iterations: Infinity,
    easing: 'ease-in-out'
  });
} function typeWriterEffect() {
  const text = " AI ";
  const element = document.querySelector('.AI-text');
  let index = 0;
  
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150);
    }
  }
  
  element.textContent = '';
  type();
}

function addParallaxEffect() {
  const title = document.querySelector('.Title');
  
  title.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = title.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    document.querySelector('.cloud1').style.transform = 
      `translate(${x * 30}px, ${y * 30}px)`;
    document.querySelector('.cloud2').style.transform = 
      `translate(${-x * 20}px, ${-y * 20}px)`;
  });
}

function initSkillProgressBars() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute('data-percent');
        entry.target.style.width = percent;
      }
    });
  }, { threshold: 0.2 });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}


document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    typeWriterEffect();
    addParallaxEffect();
    initSkillProgressBars();

    // Initialize the AI Quiz
    window.aiQuiz = new AIQuiz();
});


// Chatbot Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatModal = document.getElementById('chatbotModal');
    const closeBtn = document.querySelector('.chatbot-close');

    // Open modal
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            chatModal.style.display = 'block';
            chatModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === chatModal) {
            closeModal();
        }
    });

    // Close modal function
    function closeModal() {
        chatModal.style.display = 'none';
        chatModal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && chatModal.style.display === 'block') {
            closeModal();
        }
    });
});


// Quiz functionality
class AIQuiz {
    constructor() {
        this.questions = [
            // Placeholder questions - you can replace these later
            {
                question: "What does AI stand for?",
                options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Applied Intelligence"],
                correct: 0
            },
            {
                question: "Which of the following is a type of machine learning?",
                options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "All of the above"],
                correct: 3
            },
            {
                question: "What is a neural network?",
                options: ["A computer network", "A biological network", "A computational model inspired by biological neural networks", "A social network"],
                correct: 2
            },
            {
                question: "What is the purpose of training data in machine learning?",
                options: ["To test the model", "To teach the model patterns", "To validate the model", "To deploy the model"],
                correct: 1
            },
            {
                question: "Which algorithm is commonly used for classification tasks?",
                options: ["Linear Regression", "Decision Trees", "K-means", "PCA"],
                correct: 1
            },
            {
                question: "What is overfitting in machine learning?",
                options: ["Model performs well on training data but poorly on new data", "Model performs poorly on all data", "Model is too simple", "Model trains too fast"],
                correct: 0
            },
            {
                question: "What does NLP stand for?",
                options: ["Natural Language Processing", "Neural Language Programming", "Network Language Protocol", "New Learning Process"],
                correct: 0
            },
            {
                question: "Which of these is a popular deep learning framework?",
                options: ["TensorFlow", "PyTorch", "Keras", "All of the above"],
                correct: 3
            },
            {
                question: "What is the main goal of reinforcement learning?",
                options: ["Classification", "Regression", "Learning through rewards and penalties", "Clustering"],
                correct: 2
            },
            {
                question: "What is a common activation function in neural networks?",
                options: ["ReLU", "Sigmoid", "Tanh", "All of the above"],
                correct: 3
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        
        this.initializeQuiz();
    }
    
    initializeQuiz() {
        const quizButton = document.getElementById('quizButton');
        const quizModal = document.getElementById('quizModal');
        const closeBtn = document.querySelector('.quiz-close');
        const startBtn = document.getElementById('startQuizBtn');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const restartBtn = document.getElementById('restartBtn');
        const shareBtn = document.getElementById('shareBtn');

        // Open modal
        if (quizButton) {
            quizButton.addEventListener('click', () => {
                quizModal.style.display = 'block';
                quizModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }

        // Close modal
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeQuizModal();
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === quizModal) {
                this.closeQuizModal();
            }
        });

        // Start quiz
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startQuiz();
            });
        }

        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }

        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousQuestion();
            });
        }

        // Restart quiz
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restartQuiz();
            });
        }
        // Share score
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareScore();
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && quizModal.style.display === 'block') {
                this.closeQuizModal();
            }
        });
    }
    
    closeQuizModal() {
        const quizModal = document.getElementById('quizModal');
        quizModal.style.display = 'none';
        quizModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    startQuiz() {
        this.quizStarted = true;
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        document.getElementById('quizWelcome').style.display = 'none';
        document.getElementById('quizContent').style.display = 'block';
        document.getElementById('quizResults').style.display = 'none';
        
        this.displayQuestion();
    }

    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('questionText');
        const quizOptions = document.getElementById('quizOptions');
        const questionCounter = document.getElementById('questionCounter');
        const progressFill = document.getElementById('progressFill');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        // Update question text
        questionText.textContent = question.question;

        // Update question counter
        questionCounter.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;

        // Update progress bar
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        progressFill.style.width = `${progress}%`;

        // Clear previous options
        quizOptions.innerHTML = '';

        // Create option elements
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.setAttribute('data-index', index);

            // Check if this option was previously selected
            if (this.userAnswers[this.currentQuestion] === index) {
                optionElement.classList.add('selected');
            }

            optionElement.addEventListener('click', () => {
                this.selectOption(index);
            });

            quizOptions.appendChild(optionElement);
        });

        // Update navigation buttons
        prevBtn.disabled = this.currentQuestion === 0;
        
        if (this.currentQuestion === this.questions.length - 1) {
            nextBtn.textContent = 'Finish Quiz';
        } else {
            nextBtn.textContent = 'Next';
        }
    }

    selectOption(selectedIndex) {
        // Remove previous selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selection to clicked option
        document.querySelector(`[data-index="${selectedIndex}"]`).classList.add('selected');

        // Store user answer
        this.userAnswers[this.currentQuestion] = selectedIndex;
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }

    finishQuiz() {
        // Calculate score
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });

        this.showResults();
    }

    showResults() {
        document.getElementById('quizContent').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';

        const finalScore = document.getElementById('finalScore');
        const scoreMessage = document.getElementById('scoreMessage');

        finalScore.textContent = `${this.score}/${this.questions.length}`;

        // Generate score message based on performance
        let message = '';
        const percentage = (this.score / this.questions.length) * 100;

        if (percentage >= 90) {
            message = 'Outstanding! You\'re an AI expert! 🎉';
        } else if (percentage >= 80) {
            message = 'Excellent work! You have strong AI knowledge! 👏';
        } else if (percentage >= 70) {
            message = 'Good job! You\'re on the right track! 👍';
        } else if (percentage >= 60) {
            message = 'Not bad! Keep learning and improving! 📚';
        } else {
            message = 'Keep studying! There\'s always room to grow! 💪';
        }

        scoreMessage.textContent = message;

        // Animate score circle
        this.animateScoreCircle();
    }

    animateScoreCircle() {
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.transform = 'scale(0)';
        
        setTimeout(() => {
            scoreCircle.style.transition = 'transform 0.5s ease-out';
            scoreCircle.style.transform = 'scale(1)';
        }, 100);
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        document.getElementById('quizResults').style.display = 'none';
        document.getElementById('quizWelcome').style.display = 'block';
        document.getElementById('quizContent').style.display = 'none';
    }

    shareScore() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const shareText = `I just scored ${this.score}/${this.questions.length} (${percentage}%) on Arun's AI Knowledge Quiz! 🤖 Test your AI knowledge too!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'AI Quiz Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Score copied to clipboard! Share it with your friends!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Score copied to clipboard! Share it with your friends!');
            });
        }
    }

    // Method to update questions (you can call this to replace placeholder questions)
    updateQuestions(newQuestions) {
        this.questions = newQuestions;
        this.restartQuiz();
    }
}

// Initialize the quiz when DOM is loaded

