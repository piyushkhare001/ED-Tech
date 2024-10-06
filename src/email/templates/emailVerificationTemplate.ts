const otpTemplate = (otp: string): string => {
  return `<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Verify Your DESIZNIDEAZ Account</title>
	  <style>
		@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@300;400&display=swap');
		
		body {
		  font-family: 'Roboto', Arial, sans-serif;
		  line-height: 1.6;
		  color: #333;
		  background-color: #f4f4f4;
		  margin: 0;
		  padding: 0;
		}
		.container {
		  max-width: 600px;
		  margin: 20px auto;
		  background-color: #ffffff;
		  border-radius: 8px;
		  overflow: hidden;
		  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		}
		.header {
		  background-color: #3498db;
		  color: #ffffff;
		  text-align: center;
		  padding: 20px;
		}
		.logo {
		  font-family: 'Poppins', sans-serif;
		  font-size: 36px;
		  margin: 0;
		}
		.content {
		  padding: 30px;
		  text-align: center;
		}
		.title {
		  font-family: 'Poppins', sans-serif;
		  font-size: 24px;
		  color: #3498db;
		  margin-bottom: 20px;
		}
		.otp {
		  font-size: 36px;
		  font-weight: bold;
		  color: #333;
		  letter-spacing: 5px;
		  margin: 30px 0;
		}
		.message {
		  margin-bottom: 30px;
		}
		.footer {
		  background-color: #f8f8f8;
		  text-align: center;
		  padding: 20px;
		  font-size: 14px;
		  color: #888;
		}
		.social-icons {
		  margin-top: 20px;
		}
		.social-icons a {
		  display: inline-block;
		  margin: 0 10px;
		  color: #3498db;
		  text-decoration: none;
		}
	  </style>
	</head>
	<body>
	  <div class="container">
		<div class="header">
		  <h1 class="logo">DESIZNIDEAZ</h1>
		</div>
		<div class="content">
		  <h2 class="title">Verify Your Account</h2>
		  <p class="message">Thank you for choosing DESIZNIDEAZ, your gateway to professional growth and innovation. To complete your registration and access our cutting-edge courses, please use the following One-Time Password (OTP):</p>
		  <div class="otp">${otp}</div>
		  <p class="message">This OTP is valid for 10 minutes. If you didn't request this verification, please ignore this email.</p>
		  <p>Get ready to embark on a transformative learning journey with DESIZNIDEAZ!</p>
		  <p>Explore our diverse range of courses designed to enhance your skills and advance your career, including placement-guaranteed programs, internship opportunities, and specialized training.</p>
		</div>
		<div class="footer">
		  <p>Our expert instructors are here to support you throughout your learning journey.</p>
		  <p>Contact us at <a href="mailto:support@desiznideaz.com">support@desiznideaz.com</a></p>
		  <p>All our courses come with AICTE-approved certificates upon successful completion.</p>
		  <div class="social-icons">
			<a href="#" title="Facebook">📘</a>
			<a href="#" title="Instagram">📷</a>
			<a href="#" title="Twitter">🐦</a>
			<a href="#" title="LinkedIn">💼</a>
		  </div>
		</div>
	  </div>
	</body>
	</html>`;
};

export default otpTemplate;
