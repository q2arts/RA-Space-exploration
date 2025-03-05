function handleSubmit(event) {
    event.preventDefault();

    // Get form values
    const formData = {
        name: event.target[0].value,
        email: event.target[1].value,
        message: event.target[2].value
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);

    // Show success message
    alert('Message sent successfully! We\'ll respond within 24 hours.');

    // Reset form
    event.target.reset();
}

// Add input validation styling
document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('invalid', (e) => {
        e.target.style.borderColor = '#ff4757';
    });

    element.addEventListener('input', (e) => {
        e.target.style.borderColor = '#2a2f45';
    });
});