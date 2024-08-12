function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 60, // Adjust for fixed header
        behavior: 'smooth'
    });
}
