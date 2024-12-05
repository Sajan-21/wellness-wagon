exports.orderMailSeller = function (buyer, product) {
    return new Promise(async (resolve, reject) => {
      try {
        let template = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background: #007bff;
        color: white;
        padding: 10px 0;
        border-radius: 5px 5px 0 0;
      }
      .content {
        margin: 20px 0;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888888;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>New Order !!!</h1>
      </div>
      <div class="content">
        <p>order details : </p>
        <ul>
          <li>Ordered by : ${buyer.name}</li>
          <li>product : ${product._id}</li>
          <li>price : ${product.price}</li>
        </ul>
      </div>
      <div class="footer">
        <p>&copy; 2024 Our Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
        resolve(template);
      }
      catch (error) {
        console.log(error);
        reject(error);
      }
    })
  };