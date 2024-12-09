exports.orderMailAdmin = function (buyer,seller, product) {
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
        <h1>New Order !!!</h1>
      </div>
      <div class="content">
        <div>
          <p>buyer details : </p>
        <ul>
          <li>${buyer._id}</li>
          <li>${buyer.ph_number}</li>
          <li>${buyer.email}</li>
          <li>${buyer.postal_area}</li>
          <li>${buyer.pincode}</li>
        </ul>
        </div>
        <div>
          <p>seller details : </p>
        <ul>
          <li>${seller._id}</li>
          <li>${seller.ph_number}</li>
          <li>${seller.email}</li>
          <li>${seller.company}</li>
        </ul>
        </div>
        <div>
          <p>product details : </p>
        <ul>
          <li>${product._id}</li>
          <li>${product.quantity} items</li>
          <li>${product.price}</li>
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