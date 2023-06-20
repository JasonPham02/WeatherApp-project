document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    
    // Perform validation or further processing
    
    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    // Display confirmation message or take any other action
    alert('Thank you for your feedback!');
  });
  