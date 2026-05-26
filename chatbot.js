// ===== Chatbot Intelligent pour Portfolio =====

// Base de connaissances sur Achraf Arrouf
const knowledgeBase = {
    // Informations personnelles
    nom: "Achraf Arrouf",
    titre: "Développeur Web Junior Full Stack",
    localisation: "Casablanca, Maroc",
    email: "achrafarrouf9@gmail.com",
    telephone: "+212674810831",
    whatsapp: "+212674810831",
    github: "https://github.com/ach45raf",
    linkedin: "https://www.linkedin.com/in/achraf-arrouf-629487351",
    
    // Compétences
    langages: ["HTML", "CSS", "JavaScript", "PHP", "Python", "SQL"],
    frameworks: ["Laravel", "React.js", "Next.js", "Express.js", "Bootstrap", "Tailwind CSS"],
    outils: ["Git", "GitHub", "Docker", "VS Code", "WordPress", "GitHub Copilot"],
    softSkills: ["Résolution de problèmes", "Travail en équipe", "Gestion du temps", "Communication", "Esprit d'analyse"],
    
    // Projets
    projets: [
        {
            nom: "Application Gestion RH",
            description: "Projet réalisé durant le stage chez SPS TECHNOLOGIE. Développement du module disciplinaire, gestion des avertissements et des contentieux.",
            technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"]
        },
        {
            nom: "Application Gestion Bibliothèque",
            description: "Application web de gestion des livres, utilisateurs et emprunts.",
            technologies: ["PHP", "MySQL", "JavaScript", "CSS"]
        },
        {
            nom: "Marketplace Maalem",
            description: "Plateforme mettant en relation les citoyens avec les artisans. Les citoyens peuvent rechercher des artisans selon leurs besoins.",
            technologies: ["Laravel", "React", "MySQL", "Tailwind"]
        }
    ],
    
    // Expériences
    experiences: [
        {
            poste: "Stagiaire Développeur Web Full Stack",
            entreprise: "SPS TECHNOLOGIE",
            periode: "Mars 2026 - Avril 2026",
            description: "Développement d'une application de gestion RH avec modules disciplinaires"
        },
        {
            poste: "Assistant Administratif",
            entreprise: "Cash Plus",
            periode: "Mai 2024 - Août 2024",
            description: "Interface client, communication et coordination opérationnelle"
        },
        {
            poste: "Agent de Documentation",
            entreprise: "CNSS",
            periode: "Janvier 2024 - Avril 2024",
            description: "Optimisation du système d'archivage et gestion documentaire"
        }
    ],
    
    // Formation
    formations: [
        {
            diplome: "Technicien Spécialisé en Développement Digital",
            etablissement: "Institut Spécialisé en Gestion et Informatique",
            periode: "2024 - 2026",
            specialite: "Développement Web Full Stack"
        },
        {
            diplome: "Baccalauréat Science Physique",
            etablissement: "Lycée Qualifiant Jaafar El Fassi El Fihri",
            periode: "2022 - 2023"
        }
    ],
    
    // Certifications
    certifications: [
        "Python Essentials 1 & 2 - Cisco",
        "JavaScript Essentials 1 & 2 - Cisco",
        "English for IT - Cisco",
        "Create Digital Content - Cisco"
    ],
    
    // Langues
    langues: {
        "Arabe": "Langue maternelle",
        "Français": "Bien",
        "Anglais": "Bien"
    }
};

// Réponses prédéfinies intelligentes
const responses = {
    salutations: [
        "Bonjour ! 👋 Je suis l'assistant virtuel d'Achraf. Comment puis-je vous aider ?",
        "Salut ! 😊 Ravi de vous rencontrer ! Que souhaitez-vous savoir sur Achraf ?",
        "Hello ! 🌟 Je suis là pour répondre à vos questions sur le profil d'Achraf !"
    ],
    
    competences: `Achraf maîtrise plusieurs technologies :

🔹 **Langages** : ${knowledgeBase.langages.join(", ")}
🔹 **Frameworks** : ${knowledgeBase.frameworks.join(", ")}
🔹 **Outils** : ${knowledgeBase.outils.join(", ")}

Il possède également d'excellentes soft skills en résolution de problèmes et travail d'équipe !`,
    
    projets: `Achraf a réalisé ${knowledgeBase.projets.length} projets principaux :

${knowledgeBase.projets.map((p, i) => `
**${i + 1}. ${p.nom}**
${p.description}
Technologies : ${p.technologies.join(", ")}
`).join("\n")}

Souhaitez-vous plus de détails sur un projet spécifique ?`,
    
    experience: `Achraf possède ${knowledgeBase.experiences.length} expériences professionnelles :

${knowledgeBase.experiences.map((e, i) => `
**${i + 1}. ${e.poste}** chez ${e.entreprise}
📅 ${e.periode}
${e.description}
`).join("\n")}`,
    
    formation: `**Formation d'Achraf :**

${knowledgeBase.formations.map((f, i) => `
**${i + 1}. ${f.diplome}**
🏫 ${f.etablissement}
📅 ${f.periode}
${f.specialite ? `Spécialité : ${f.specialite}` : ''}
`).join("\n")}`,
    
    certifications: `Achraf possède ${knowledgeBase.certifications.length} certifications :

${knowledgeBase.certifications.map((c, i) => `${i + 1}. ✅ ${c}`).join("\n")}`,
    
    contact: `📧 **Email** : ${knowledgeBase.email}
📱 **WhatsApp** : ${knowledgeBase.whatsapp}
🔗 **GitHub** : ${knowledgeBase.github}
💼 **LinkedIn** : ${knowledgeBase.linkedin}
📍 **Localisation** : ${knowledgeBase.localisation}

N'hésitez pas à le contacter !`,
    
    disponibilite: "Achraf est actuellement **disponible** pour de nouvelles opportunités professionnelles ! 🚀",
    
    default: "Je ne suis pas sûr de comprendre votre question. Vous pouvez me demander sur :\n\n• Ses compétences\n• Ses projets\n• Son expérience\n• Sa formation\n• Ses certifications\n• Comment le contacter"
};

// Fonction pour analyser la question et trouver la meilleure réponse
function analyzeQuestion(question) {
    const q = question.toLowerCase().trim();
    
    console.log('Question reçue:', q); // Debug
    
    // Salutations
    if (q.match(/\b(bonjour|salut|hello|hi|hey|bonsoir|coucou)\b/i)) {
        return responses.salutations[Math.floor(Math.random() * responses.salutations.length)];
    }
    
    // Âge
    if (q.includes('âge') || q.includes('age') || q.includes('vieux') || q.includes('ans')) {
        return "Achraf est un jeune développeur diplômé en 2026. Il a obtenu son Baccalauréat en 2023, ce qui fait de lui un professionnel dynamique et à jour avec les dernières technologies ! 🎓";
    }
    
    // Localisation / Ville
    if (q.includes('où') || q.includes('ou') || q.includes('ville') || q.includes('habite') || q.includes('vit') || q.includes('localisation') || q.includes('casablanca') || q.includes('maroc')) {
        return `Achraf est basé à **Casablanca, Maroc** 🇲🇦\n\nIl est disponible pour des opportunités sur place ou en remote !`;
    }
    
    // Salaire / Rémunération
    if (q.includes('salaire') || q.includes('rémunération') || q.includes('remuneration') || q.includes('prix') || q.includes('tarif') || q.includes('combien')) {
        return "Pour discuter de la rémunération et des conditions, je vous invite à contacter Achraf directement :\n\n📧 **Email** : achrafarrouf9@gmail.com\n💼 **LinkedIn** : linkedin.com/in/achraf-arrouf-629487351\n\nIl sera ravi d'échanger avec vous sur ce sujet ! 😊";
    }
    
    // Compétences - Amélioration de la détection
    if (q.includes('compétence') || q.includes('competence') || q.includes('skill') || 
        q.includes('technologie') || q.includes('langage') || q.includes('framework') || 
        q.includes('outil') || q.includes('maîtrise') || q.includes('maitrise') ||
        q.includes('connaiss') || q.includes('sait') || q.includes('peut faire') ||
        q.includes('capable')) {
        return responses.competences;
    }
    
    // Projets - Amélioration de la détection
    if (q.includes('projet') || q.includes('réalisé') || q.includes('realise') || 
        q.includes('application') || q.includes('développé') || q.includes('developpe') ||
        q.includes('créé') || q.includes('cree') || q.includes('portfolio') || 
        q.includes('travail') || q.includes('fait') || q.includes('construit')) {
        return responses.projets;
    }
    
    // Expérience - Amélioration de la détection
    if (q.includes('expérience') || q.includes('experience') || q.includes('travail') || 
        q.includes('poste') || q.includes('emploi') || q.includes('stage') || 
        q.includes('entreprise') || q.includes('travaillé') || q.includes('travaille') ||
        q.includes('carrière') || q.includes('carriere') || q.includes('parcours')) {
        return responses.experience;
    }
    
    // Formation - Amélioration de la détection
    if (q.includes('formation') || q.includes('diplôme') || q.includes('diplome') || 
        q.includes('étude') || q.includes('etude') || q.includes('école') || 
        q.includes('ecole') || q.includes('université') || q.includes('universite') || 
        q.includes('bac') || q.includes('éducation') || q.includes('education')) {
        return responses.formation;
    }
    
    // Certifications - Amélioration de la détection
    if (q.includes('certification') || q.includes('certifié') || q.includes('certifie') || 
        q.includes('cisco') || q.includes('sololearn') || q.includes('badge') ||
        q.includes('certificat')) {
        return responses.certifications;
    }
    
    // Contact - Amélioration de la détection
    if (q.includes('contact') || q.includes('email') || q.includes('téléphone') || 
        q.includes('telephone') || q.includes('linkedin') || q.includes('github') || 
        q.includes('joindre') || q.includes('écrire') || q.includes('ecrire') ||
        q.includes('contacter') || q.includes('appeler') || q.includes('mail') ||
        q.includes('whatsapp') || q.includes('numéro') || q.includes('numero')) {
        return responses.contact;
    }
    
    // Disponibilité - Amélioration de la détection
    if (q.includes('disponible') || q.includes('disponibilité') || q.includes('disponibilite') ||
        q.includes('recrut') || q.includes('embauche') || q.includes('poste') || 
        q.includes('opportunité') || q.includes('opportunite') || q.includes('cherche') ||
        q.includes('libre') || q.includes('engager')) {
        return responses.disponibilite;
    }
    
    // Langages spécifiques
    if (q.includes('php') || q.includes('laravel')) {
        return "Achraf a une excellente maîtrise de **PHP** et **Laravel** ! Il a développé plusieurs applications avec Laravel, notamment l'application de gestion RH chez SPS TECHNOLOGIE. 🚀";
    }
    
    if (q.includes('javascript') || q.includes('react') || q.includes('js') || q.includes('next')) {
        return "Achraf maîtrise **JavaScript**, **React.js** et **Next.js** ! Il a utilisé React pour le projet Marketplace Maalem et possède des certifications JavaScript Essentials de Cisco. 💻";
    }
    
    if (q.includes('python')) {
        return "Achraf connaît **Python** et possède les certifications Python Essentials 1 & 2 de Cisco Networking Academy ! 🐍";
    }
    
    if (q.includes('html') || q.includes('css')) {
        return "Achraf maîtrise parfaitement **HTML** et **CSS** ! Il utilise également **Bootstrap** et **Tailwind CSS** pour créer des interfaces modernes et responsives. 🎨";
    }
    
    if (q.includes('sql') || q.includes('mysql') || q.includes('base de données') || q.includes('database')) {
        return "Achraf a une bonne maîtrise de **SQL** et **MySQL** ! Il a travaillé avec des bases de données dans tous ses projets, notamment pour l'application de gestion RH et la bibliothèque. 🗄️";
    }
    
    if (q.includes('git') || q.includes('github')) {
        return "Achraf utilise **Git** et **GitHub** pour la gestion de versions de ses projets. Vous pouvez consulter son profil GitHub : https://github.com/ach45raf 🔗";
    }
    
    // Soft skills
    if (q.includes('qualité') || q.includes('qualite') || q.includes('soft skill') || q.includes('personnalité') || q.includes('personnalite')) {
        return `Achraf possède d'excellentes **soft skills** :\n\n✅ Résolution de problèmes\n✅ Travail en équipe\n✅ Gestion du temps\n✅ Communication efficace\n✅ Esprit d'analyse\n\nCes qualités font de lui un collaborateur fiable et efficace ! 🌟`;
    }
    
    // Langues parlées
    if (q.includes('langue') || q.includes('parle') || q.includes('anglais') || q.includes('français') || q.includes('francais') || q.includes('arabe')) {
        return `**Langues parlées par Achraf :**\n\n🇲🇦 **Arabe** : Langue maternelle\n🇫🇷 **Français** : Bien\n🇬🇧 **Anglais** : Bien (Certifié English for IT par Cisco)\n\nIl peut communiquer efficacement dans un environnement professionnel international ! 🌍`;
    }
    
    // Motivation / Pourquoi le recruter
    if (q.includes('pourquoi') || q.includes('motivation') || q.includes('recruter') || q.includes('choisir') || q.includes('embaucher')) {
        return `**Pourquoi recruter Achraf ?**\n\n✅ **Compétences solides** : Full Stack avec Laravel, React, PHP, JavaScript\n✅ **Expérience pratique** : 3 expériences professionnelles + projets concrets\n✅ **Certifications** : 7 certifications Cisco et SoloLearn\n✅ **Passionné** : Toujours à jour avec les dernières technologies\n✅ **Polyvalent** : Front-end, Back-end, et Design\n✅ **Disponible** : Prêt à s'investir dans de nouveaux défis !\n\nContactez-le pour en discuter ! 🚀`;
    }
    
    // Qui es-tu / Présentation
    if (q.includes('qui') || q.includes('présent') || q.includes('present') || 
        q.includes('profil') || q.includes('cv') || q.includes('à propos') || 
        q.includes('a propos') || q.includes('toi') || q.includes('vous')) {
        return `**${knowledgeBase.nom}** est un ${knowledgeBase.titre} basé à ${knowledgeBase.localisation}.

Diplômé en Développement Digital, il possède une solide maîtrise du développement front-end et back-end. Passionné par les technologies web modernes, il combine créativité et rigueur technique.

📊 **En chiffres :**
• ${knowledgeBase.projets.length} projets réalisés
• ${knowledgeBase.certifications.length} certifications
• ${knowledgeBase.experiences.length} expériences professionnelles

Que souhaitez-vous savoir de plus ?`;
    }
    
    // Merci
    if (q.includes('merci') || q.includes('thanks') || q.includes('thank')) {
        return "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions sur Achraf !";
    }
    
    // Au revoir
    if (q.includes('au revoir') || q.includes('bye') || q.includes('adieu') || q.includes('à bientôt') || q.includes('a bientot') || q.includes('ciao')) {
        return "Au revoir ! 👋 N'hésitez pas à contacter Achraf directement pour discuter de vos projets !";
    }
    
    // Réponse par défaut améliorée
    return `Je ne suis pas sûr de comprendre votre question "${question}".\n\n💡 **Essayez de me demander :**\n\n• Ses compétences techniques\n• Ses projets réalisés\n• Son expérience professionnelle\n• Sa formation et diplômes\n• Ses certifications\n• Ses langues parlées\n• Comment le contacter\n• Pourquoi le recruter\n\nOu cliquez sur le bouton 💡 pour voir les suggestions !`;
}

// Suggestions de questions
const suggestions = [
    "Quelles sont ses compétences ?",
    "Quels projets a-t-il réalisés ?",
    "Quelle est son expérience ?",
    "Quelles certifications possède-t-il ?",
    "Comment le contacter ?",
    "Est-il disponible ?"
];

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { analyzeQuestion, suggestions, knowledgeBase };
}
