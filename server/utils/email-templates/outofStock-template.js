exports.outOfStock = function (seller, product) {
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
        display: flex;
        justify-content: space-evenly;
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
        <h1>Product Out of Stock !!!</h1>
      </div>
      <div class="content">
        <div>
          <p>dear ${seller.name} your product is out of stock, please update the stock</p>
          <p>product details : </p>
        <ul>
          <li>${product._id}</li>
          <li>${product.name}</li>
        </ul>
        </div>
        
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