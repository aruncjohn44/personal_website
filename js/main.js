

/* =================================================================
   Arun C John — AI Leadership Site
   Interactions: nav, smooth scroll, scroll reveal, counters,
   scroll progress, hero neural-network canvas.
   (AIQuiz class + chatbot modal logic preserved below.)
   ================================================================= */


// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile nav if open
    document.getElementById('nav')?.classList.remove('open');
  });
});


// Sticky nav state + scroll progress bar
function onScroll() {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);


  const bar = document.getElementById('scrollProgress');
  if (bar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });


// Mobile nav toggle
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}


// Scroll-reveal animations
function initReveal() {
  const items = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
}


// Animated number counters
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target).toString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => io.observe(el));
}


// Make the playground cards keyboard-accessible (they trigger modals on click)
function initPlaygroundA11y() {
  ['chatButton', 'quizButton'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
}


// Hero neural-network canvas (lightweight, respects reduced motion)
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;


  const ctx = canvas.getContext('2d');
  let width, height, nodes, raf;
  const COUNT = 54;
  const LINK_DIST = 140;


  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }


  function makeNodes() {
    nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }


  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;


      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x, dy = n.y - m.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.4;
          ctx.strokeStyle = `rgba(120, 150, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = 'rgba(160, 190, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }


  function start() { resize(); makeNodes(); cancelAnimationFrame(raf); draw(); }
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 200);
  });
  start();
}


document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();


  onScroll();
  initNav();
  initReveal();
  initCounters();
  initPlaygroundA11y();
  initHeroCanvas();


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
        this.questionSets = {
            set1: [
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
            ],
            set2: [
                {
                    question: "What is the difference between AI and Machine Learning?",
                    options: ["They are the same thing", "AI is broader, ML is a subset of AI", "ML is broader, AI is a subset of ML", "They are completely unrelated"],
                    correct: 1
                },
                {
                    question: "What is a convolutional neural network (CNN) primarily used for?",
                    options: ["Text processing", "Image recognition", "Time series analysis", "Audio processing"],
                    correct: 1
                },
                {
                    question: "What does GPU stand for in the context of AI training?",
                    options: ["General Processing Unit", "Graphics Processing Unit", "Generative Processing Unit", "Global Processing Unit"],
                    correct: 1
                },
                {
                    question: "What is the purpose of a loss function in machine learning?",
                    options: ["To increase model complexity", "To measure prediction errors", "To add more features", "To reduce training time"],
                    correct: 1
                },
                {
                    question: "What is transfer learning?",
                    options: ["Moving data between computers", "Using pre-trained models for new tasks", "Converting between file formats", "Transferring knowledge between humans"],
                    correct: 1
                },
                {
                    question: "What is the vanishing gradient problem?",
                    options: ["When gradients become too large", "When gradients become too small during backpropagation", "When the model stops learning", "When data disappears"],
                    correct: 1
                },
                {
                    question: "What is ensemble learning?",
                    options: ["Training one very large model", "Combining multiple models for better performance", "Learning from musical data", "Training models in sequence"],
                    correct: 1
                },
                {
                    question: "What is the purpose of regularization in machine learning?",
                    options: ["To speed up training", "To prevent overfitting", "To increase model complexity", "To reduce data size"],
                    correct: 1
                },
                {
                    question: "What is a transformer in deep learning?",
                    options: ["A type of robot", "An attention-based neural network architecture", "A data preprocessing tool", "A hardware component"],
                    correct: 1
                },
                {
                    question: "What is the main advantage of using attention mechanisms?",
                    options: ["Faster training", "Better handling of long sequences", "Smaller model size", "Less data required"],
                    correct: 1
                }
            ],
            set3: [
                {
                    question: "What is MLOps?",
                    options: ["Machine Learning Operations", "Multi-Level Operations", "Model Learning Optimization", "Machine Logic Operations"],
                    correct: 0
                },
                {
                    question: "What is the purpose of cross-validation?",
                    options: ["To increase training speed", "To assess model performance and generalization", "To reduce model size", "To clean data"],
                    correct: 1
                },
                {
                    question: "What is a GAN?",
                    options: ["General Artificial Network", "Generative Adversarial Network", "Global Analysis Network", "Gradient Activation Network"],
                    correct: 1
                },
                {
                    question: "What is the curse of dimensionality?",
                    options: ["Too many features making analysis difficult", "Not enough data", "Models becoming too complex", "Hardware limitations"],
                    correct: 0
                },
                {
                    question: "What is feature engineering?",
                    options: ["Building hardware features", "Creating or selecting relevant input variables", "Engineering software features", "Designing user interfaces"],
                    correct: 1
                },
                {
                    question: "What is the difference between bagging and boosting?",
                    options: ["No difference", "Bagging trains models in parallel, boosting in sequence", "Bagging is faster", "Boosting uses more data"],
                    correct: 1
                },
                {
                    question: "What is a hyperparameter?",
                    options: ["A very important parameter", "A parameter set before training", "A parameter learned during training", "A parameter used for testing"],
                    correct: 1
                },
                {
                    question: "What is the purpose of batch normalization?",
                    options: ["To reduce batch size", "To normalize input data", "To stabilize and accelerate training", "To increase model accuracy"],
                    correct: 2
                },
                {
                    question: "What is federated learning?",
                    options: ["Learning from government data", "Training models across decentralized data", "Learning in groups", "Federal regulation of AI"],
                    correct: 1
                },
                {
                    question: "What is the difference between precision and recall?",
                    options: ["They are the same", "Precision is about true positives vs predicted positives, recall is about true positives vs actual positives", "Precision is more important", "Recall is more accurate"],
                    correct: 1
                }
            ]
        };
       
        this.questions = [];
        this.currentQuestionSet = '';
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
       
        this.initializeQuiz();
        this.loadQuestionsFromJSON(); // Try to load from JSON first
    }


    // Method to load questions from JSON file
    async loadQuestionsFromJSON() {
        try {
            const response = await fetch('data/quiz-questions.json');
            if (response.ok) {
                const jsonData = await response.json();
                this.questionSets = { ...this.questionSets, ...jsonData };
                console.log('Questions loaded from JSON file successfully');
            }
        } catch (error) {
            console.log('No JSON file found or error loading, using default questions:', error.message);
        }
    }


    // Method to randomly select a question set
    selectRandomQuestionSet() {
        const setKeys = Object.keys(this.questionSets);
        const randomIndex = Math.floor(Math.random() * setKeys.length);
        this.currentQuestionSet = setKeys[randomIndex];
        this.questions = [...this.questionSets[this.currentQuestionSet]];
       
        console.log(`Selected question set: ${this.currentQuestionSet}`);
       
        // Update welcome message to show which set is selected
        const welcomeMessage = document.getElementById('quizWelcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Ready to test your AI knowledge? You'll be answering questions from ${this.currentQuestionSet.toUpperCase()}. Good luck! 🚀`;
        }
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
                this.selectRandomQuestionSet(); // Select random set when opening quiz
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
            message = `Outstanding! You aced ${this.currentQuestionSet.toUpperCase()}! 🎉`;
        } else if (percentage >= 80) {
            message = `Excellent work on ${this.currentQuestionSet.toUpperCase()}! 👏`;
        } else if (percentage >= 70) {
            message = `Good job on ${this.currentQuestionSet.toUpperCase()}! 👍`;
        } else if (percentage >= 60) {
            message = `Not bad on ${this.currentQuestionSet.toUpperCase()}! Keep learning! 📚`;
        } else {
            message = `Keep studying ${this.currentQuestionSet.toUpperCase()}! There's always room to grow! 💪`;
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
