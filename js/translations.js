const resources = {
    es: {
        translation: {
            nav: {
                home: "Inicio",
                blog: "Blog"
            },
            hero: {
                role: "Estudiante de Programación & <br> Ex-Ingeniería Mecánica <br> Enfocado en Backend (Python/Go)",
                description: "Construyo proyectos pequeños pero funcionales. Priorizo simplicidad, mantenibilidad y rendimiento sobre stacks innecesariamente complejos. <br> Busco mi primera oportunidad profesional para aplicar mi capacidad lógica y seguir aprendiendo.",
                contact_btn: "Contáctame",
                projects_btn: "Ver proyectos"
            },
            about: {
                title: "Sobre mí",
                p1: "Actualmente estudio <b>Técnico en Programación Empresarial</b> y complemento mi formación con <span class=\"text-tone-gold font-medium\">aprendizaje autodidacta</span>.<br> Mi paso por Ingeniería Mecánica fortaleció mi pensamiento <span class=\"text-tone-gold font-medium\">analítico y estructurado</span>, que aplico día a día en la resolución de problemas.",
                p2: "Tengo experiencia trabajando con <span class=\"text-tone-gold font-medium\">Flask</span> (Python) y <span class=\"text-tone-gold font-medium\">Go</span>, desarrollando <span class=\"text-tone-gold font-medium\">sistemas ligeros y modulares</span>. <br> En <b>frontend</b> utilizo HTML, CSS y JS, y cuando necesito más agilidad recurro a <span class=\"text-tone-gold font-medium\">TailwindCSS</span>.",
                code_comment_1: "# Mi filosofía de código",
                code_condition_1: "funcionando",
                code_condition_2: "simple",
                code_comment_2: "# Todo bien"
            },
            skills: {
                title: "Tecnologías que uso",
                backend: "Backend",
                frontend: "Frontend",
                db: "Bases de datos",
                infra: "Infraestructura"
            },
            projects: {
                title: "Proyectos recientes",
                // Proyecto 1: Pocolink
                p1_title: "Acortador de URLs (Pocolink)",
                p1_desc: "Servicio ligero en Go con enfoque en accesibilidad WCAG AAA. Backend simple, frontend con JavaScript y deploy en Render.",
                p1_demo: "Demo →",
                p1_code: "Código",
                // Proyecto 2: Clixxkey
                p2_title: "Password Manager (Clixxkey)",
                p2_desc: "CLI tool en Go con sincronización por NTP como MFA. Cifrado AES-256, datos en json cifrado.",
                p2_demo: "Demo Video →",
                p2_code: "Código",
                // Proyecto 3: Análisis Musical
                p3_title: "Análisis Musical",
                p3_desc: "Consultas SQL avanzadas sobre dataset de Spotify para identificar patrones narrativos en discografías.",
                p3_demo: "Notebook →",
                p3_dataset: "Dataset",
                // Proyecto 4: Linux Labs
                p4_title: "Linux Labs",
                p4_desc: "Scripts para optimización de Ubuntu, automatización de backups con rsync, optimización de recursos y configuración de entorno de desarrollo.",
                p4_dotfiles: "Dotfiles →",
                p4_scripts: "Scripts"
            },
            contact: {
                title: "Contacto",
                text: "<b>Abierto a nuevas oportunidades</b> de freelance, prácticas y colaboraciones en proyectos que valoren la <span class=\"text-tone-gold font-medium\">simplicidad</span> y el <span class=\"text-tone-gold font-medium\">pensamiento crítico</span>.",
                location: "Panamá",
                status: "Primeros pasos en el mercado laboral",
                btn_email: "Enviar mensaje",
                btn_github: "GitHub",
                btn_linkedin: "LinkedIn",
                btn_whatsapp: "WhatsApp"
            },
            blog_page: {
                title: "Blog / Proyectos",
                intro: "Aquí puedes listar proyectos personales, guías y experimentos (Arduino, hardware, scripts, etc.).",
                footer: "Félix Lara — Proyectos personales",
                read_more: "Leer →",
                code_github: "Código (GitHub)",
                code: "Código",
                scripts: "Scripts",
                art1_title: "Arduino: Sensor de distancia con alerta",
                art1_desc: "Proyecto de ejemplo con HC-SR04 + buzzer. Código, circuito y explicación.",
                art2_title: "Arduino: Boost con Filtro Kalman",
                art2_desc: "Sistema optimizado de detección con doble sensor HC-SR04 y filtro Kalman para estabilidad en Arduino Uno.",
                art3_title: "Automatización backups con rsync",
                art3_desc: "Script y explicación para backups incrementales en Linux (rsync + systemd timer)."
            },
            sensor_page: {
                title: "Arduino: Sensor de distancia con alerta",
                breadcrumbs: {
                    hw: "Hardware",
                    cpp: "C++",
                    level: "Principiante"
                },
                intro: "En este proyecto construí un sistema simple de detección de proximidad. Utilizando un sensor ultrasónico <span class=\"font-semibold text-tone-teal dark:text-tone-beige\">HC-SR04</span>, medimos la distancia a un objeto y usamos un buzzer para emitir una alerta sonora que se intensifica cuanto más cerca está el objeto, similar al sensor de reversa de un automóvil.",
                materials: {
                    title: "Materiales necesarios",
                    item1: "Placa Arduino Uno (o compatible)",
                    item2: "Sensor ultrasónico HC-SR04",
                    item3: "Led",
                    item4: "Protoboard y cables jumper",
                    item5: "Resistencia de 220Ω (opcional, para proteger el led)"
                },
                code: {
                    title: "El Código",
                    desc: "La lógica es sencilla: enviamos un pulso ultrasónico, medimos cuánto tarda en volver (eco) y calculamos la distancia. Si la distancia es menor a 30cm, activamos el buzzer."
                },
                tech: {
                    title: "Explicación técnica",
                    p1: "El sensor HC-SR04 funciona como un sonar. Emite un sonido inaudible para el oído humano (ultrasonido). La función <code>pulseIn()</code> de Arduino mide el tiempo en microsegundos que el pin <code>echoPin</code> permanece en estado ALTO, lo que corresponde al tiempo de vuelo de la onda sonora.",
                    p2: "Dividimos por 2 porque el sonido viaja de ida y vuelta. La constante <code>0.034</code> es la velocidad del sonido en cm/µs."
                },
                footer_back: "Volver al listado"
            },
            boost_page: {
                title: "Sistema Optimizado de Detección y Activación de Boost con Filtro Kalman",
                breadcrumbs: {
                    cat: "C++ / Arduino",
                    tag1: "Optimización",
                    tag2: "Filtros Digitales"
                },
                intro: {
                    p1: "Este proyecto implementa un sistema robusto de detección de distancia utilizando dos sensores ultrasónicos <span class=\"font-semibold text-tone-teal dark:text-tone-beige\">HC-SR04</span> en un Arduino UNO. El objetivo es activar un sistema \"Boost\" (simulado con un LED) solo cuando la detección es estable y confiable.",
                    p2: "Para lograr esto en un microcontrolador con recursos limitados (2KB SRAM), se implementó un <span class=\"font-semibold text-tone-gold\">Filtro Kalman 1D optimizado para enteros</span>, evitando el uso costoso de números de punto flotante."
                },
                features: {
                    title: "Características Clave",
                    item1: "<span class=\"font-semibold\">Optimización de Memoria:</span> Uso extensivo de <code>PROGMEM</code> y tipos de datos <code>uint8_t</code>.",
                    item2: "<span class=\"font-semibold\">Filtro Kalman Entero:</span> Cálculos escalados (x10, x100) para mantener precisión sin <code>float</code>.",
                    item3: "<span class=\"font-semibold\">Redundancia:</span> Fusión de datos de dos sensores para mayor fiabilidad.",
                    item4: "<span class=\"font-semibold\">Estabilidad:</span> Historial de estimaciones para evitar falsos positivos por ruido."
                },
                gallery: {
                    title: "Montaje y Pruebas",
                    cap1: "Vista general del circuito con Arduino Uno y sensores HC-SR04.",
                    cap2: "Vista del carrito RC de pruebas con sensores montados."
                },
                sim: {
                    title: "Simulación",
                    sub: "Pruébalo en Tinkercad",
                    desc: "Accede al esquema interactivo, explora las conexiones y ejecuta el código en el simulador.",
                    btn: "Abrir Simulador"
                },
                code: {
                    title: "Código Fuente",
                    desc: "A continuación se presenta el código completo optimizado para Arduino UNO."
                }
            }
        }
    },
    en: {
        translation: {
            nav: {
                home: "Home",
                blog: "Blog"
            },
            hero: {
                role: "Programming Student & <br> Former Mechanical Engineering Student <br> Focused on Backend (Python/Go)",
                description: "I build small but functional projects. I prioritize simplicity, maintainability, and performance over unnecessarily complex stacks. <br> I am looking for my first professional opportunity to apply my logical skills and keep learning.",
                contact_btn: "Contact Me",
                projects_btn: "View Projects"
            },
            about: {
                title: "About Me",
                p1: "I am currently studying <b>Business Programming Technician</b> and complementing my training with <span class=\"text-tone-gold font-medium\">self-taught learning</span>.<br> My background in Mechanical Engineering strengthened my <span class=\"text-tone-gold font-medium\">analytical and structured thinking</span>, which I apply daily in problem-solving.",
                p2: "I have experience working with <span class=\"text-tone-gold font-medium\">Flask</span> (Python) and <span class=\"text-tone-gold font-medium\">Go</span>, developing <span class=\"text-tone-gold font-medium\">lightweight and modular systems</span>. <br> In <b>frontend</b> I use HTML, CSS, and JS, and when I need more agility I turn to <span class=\"text-tone-gold font-medium\">TailwindCSS</span>.",
                code_comment_1: "# My code philosophy",
                code_condition_1: "working",
                code_condition_2: "simple",
                code_comment_2: "# All good"
            },
            skills: {
                title: "Technologies I Use",
                backend: "Backend",
                frontend: "Frontend",
                db: "Databases",
                infra: "Infrastructure"
            },
            projects: {
                title: "Recent Projects",
                // Project 1: Pocolink
                p1_title: "URL Shortener (Pocolink)",
                p1_desc: "Lightweight Go service focused on WCAG AAA accessibility. Simple backend, JavaScript frontend, deployed on Render.",
                p1_demo: "Demo →",
                p1_code: "Code",
                // Project 2: Clixxkey
                p2_title: "Password Manager (Clixxkey)",
                p2_desc: "Go CLI tool with NTP synchronization as MFA. AES-256 encryption, encrypted JSON data.",
                p2_demo: "Demo Video →",
                p2_code: "Code",
                // Project 3: Music Analysis
                p3_title: "Music Analysis",
                p3_desc: "Advanced SQL queries on Spotify dataset to identify narrative patterns in discographies.",
                p3_demo: "Notebook →",
                p3_dataset: "Dataset",
                // Project 4: Linux Labs
                p4_title: "Linux Labs",
                p4_desc: "Scripts for Ubuntu optimization, rsync backup automation, resource optimization, and development environment configuration.",
                p4_dotfiles: "Dotfiles →",
                p4_scripts: "Scripts"
            },
            contact: {
                title: "Contact",
                text: "<b>Open to new opportunities</b> for freelance, internships, and collaborations on projects that value <span class=\"text-tone-gold font-medium\">simplicity</span> and <span class=\"text-tone-gold font-medium\">critical thinking</span>.",
                location: "Panama",
                status: "Taking first steps in the job market",
                btn_email: "Send Message",
                btn_github: "GitHub",
                btn_linkedin: "LinkedIn",
                btn_whatsapp: "WhatsApp"
            },
            blog_page: {
                title: "Blog / Projects",
                intro: "Here you can list personal projects, guides, and experiments (Arduino, hardware, scripts, etc.).",
                footer: "Félix Lara — Personal Projects",
                read_more: "Read →",
                code_github: "Code (GitHub)",
                code: "Code",
                scripts: "Scripts",
                art1_title: "Arduino: Distance Sensor with Alert",
                art1_desc: "Example project with HC-SR04 + buzzer. Code, circuit, and explanation.",
                art2_title: "Arduino: Boost with Kalman Filter",
                art2_desc: "Optimized detection system with dual HC-SR04 sensors and Kalman filter for stability on Arduino Uno.",
                art3_title: "Backup Automation with rsync",
                art3_desc: "Script and explanation for incremental backups on Linux (rsync + systemd timer)."
            },
            sensor_page: {
                title: "Arduino: Distance Sensor with Alert",
                breadcrumbs: {
                    hw: "Hardware",
                    cpp: "C++",
                    level: "Beginner"
                },
                intro: "In this project, I built a simple proximity detection system. Using an <span class=\"font-semibold text-tone-teal dark:text-tone-beige\">HC-SR04</span> ultrasonic sensor, we measure the distance to an object and use a buzzer to emit a sound alert that intensifies as the object gets closer, similar to a car's reverse sensor.",
                materials: {
                    title: "Required Materials",
                    item1: "Arduino Uno board (or compatible)",
                    item2: "HC-SR04 ultrasonic sensor",
                    item3: "LED",
                    item4: "Breadboard and jumper wires",
                    item5: "220Ω Resistor (optional, to protect the LED)"
                },
                code: {
                    title: "The Code",
                    desc: "The logic is simple: we send an ultrasonic pulse, measure how long it takes to return (echo), and calculate the distance. If the distance is less than 30cm, we activate the buzzer."
                },
                tech: {
                    title: "Technical Explanation",
                    p1: "The HC-SR04 sensor works like a sonar. It emits a sound inaudible to the human ear (ultrasound). Arduino's <code>pulseIn()</code> function measures the time in microseconds that the <code>echoPin</code> remains HIGH, which corresponds to the flight time of the sound wave.",
                    p2: "We divide by 2 because the sound travels back and forth. The constant <code>0.034</code> is the speed of sound in cm/µs."
                },
                footer_back: "Back to list"
            },
            boost_page: {
                title: "Optimized Boost Detection and Activation System with Kalman Filter",
                breadcrumbs: {
                    cat: "C++ / Arduino",
                    tag1: "Optimization",
                    tag2: "Digital Filters"
                },
                intro: {
                    p1: "This project implements a robust distance detection system using two <span class=\"font-semibold text-tone-teal dark:text-tone-beige\">HC-SR04</span> ultrasonic sensors on an Arduino UNO. The goal is to activate a \"Boost\" system (simulated with an LED) only when detection is stable and reliable.",
                    p2: "To achieve this on a microcontroller with limited resources (2KB SRAM), an <span class=\"font-semibold text-tone-gold\">Integer Optimized 1D Kalman Filter</span> was implemented, avoiding the costly use of floating-point numbers."
                },
                features: {
                    title: "Key Features",
                    item1: "<span class=\"font-semibold\">Memory Optimization:</span> Extensive use of <code>PROGMEM</code> and <code>uint8_t</code> data types.",
                    item2: "<span class=\"font-semibold\">Integer Kalman Filter:</span> Scaled calculations (x10, x100) to maintain precision without <code>float</code>.",
                    item3: "<span class=\"font-semibold\">Redundancy:</span> Data fusion from two sensors for greater reliability.",
                    item4: "<span class=\"font-semibold\">Stability:</span> Estimation history to avoid false positives due to noise."
                },
                gallery: {
                    title: "Assembly and Testing",
                    cap1: "General view of the circuit with Arduino Uno and HC-SR04 sensors.",
                    cap2: "View of the RC test car with mounted sensors."
                },
                sim: {
                    title: "Simulation",
                    sub: "Try it on Tinkercad",
                    desc: "Access the interactive schematic, explore connections, and run the code in the simulator.",
                    btn: "Open Simulator"
                },
                code: {
                    title: "Source Code",
                    desc: "Below is the complete optimized code for Arduino UNO."
                }
            }
        }
    }
};
