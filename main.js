document.getElementById('registrationForm').addEventListener('submit', function(event) {
   
    event.preventDefault();

   
    let errors = false;
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('genderError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('formSuccess').textContent = '';

    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

   
    if (!name || !email || !phone || !gender || !password || !confirmPassword) {
        alert("Please fill in all required fields.");
        errors = true;
    }

 
    if (name.length < 3) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters long.';
        errors = true;
    }

  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        errors = true;
    }

   
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = 'Phone number must be exactly 10 digits.';
        errors = true;
    }

   
    if (gender === "") {
        document.getElementById('genderError').textContent = 'Please select your gender.';
        errors = true;
    }

   
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        errors = true;
    }

 
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        errors = true;
    }

    
    if (!errors) {
        document.getElementById('formSuccess').textContent = 'Registration submitted successfully!';
        document.getElementById('registrationForm').reset();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Select all gallery images
    const images = Array.from(document.querySelectorAll('.gallery-img'));
    
    
    const lightboxModalEl = document.getElementById('lightboxModal');
    const lightboxModal = new bootstrap.Modal(lightboxModalEl);
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    
    function updateLightbox(index) {
        currentIndex = index;
        const targetImg = images[currentIndex];
        
       
        lightboxImg.src = targetImg.src;
        lightboxCaption.textContent = targetImg.alt;
    }

    
    images.forEach((img, index) => {
        img.style.cursor = 'pointer'; 
        img.addEventListener('click', function () {
            updateLightbox(index);
            lightboxModal.show(); 
        });
    });

   
    prevBtn.addEventListener('click', function () {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = images.length - 1; 
        }
        updateLightbox(newIndex);
    });

    
    nextBtn.addEventListener('click', function () {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) {
            newIndex = 0; 
        }
        updateLightbox(newIndex);
    });


    document.addEventListener('keydown', function (e) {
        if (!lightboxModalEl.classList.contains('show')) return;
        
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});

