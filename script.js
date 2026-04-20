document.addEventListener("DOMContentLoaded", function () {

  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {

    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS MESSAGE
        alert("✅ Message sent successfully! Thanks for reaching out.");

        // reset form
        contactForm.reset();
      } else {
        alert("❌ Failed to send message. Try again.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Server not responding. Please try again later.");
    }
  });

});
const form = document.querySelector(".contact-form");
const successMessage = document.querySelector(".success-message");

form.addEventListener("submit", function () {
  setTimeout(() => {
    form.style.display = "none";
    successMessage.style.display = "block";
  }, 1000);
});
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("formSuccess");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" }
  });

  if (response.ok) {
    form.reset();

    // Hide inputs & button
    Array.from(form.elements).forEach(el => {
      if (el.tagName !== "P") el.style.display = "none";
    });

    // Show success message
    successMessage.style.display = "block";
  } else {
    alert("Something went wrong. Please try again.");
  }
});