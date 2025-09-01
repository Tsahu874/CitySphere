**CitySphere - Software Requirements Specification (SRS)**
**1. Introduction**
*1.1 Purpose*

CitySphere is a vendor-centric local marketplace and city guide application. Its purpose is to connect newcomers and residents with local vendors, artisans, bookstores, and service providers in their city.

*1.2 Scope*

  The system provides:
  
  City selection (manual + GPS).
  
  Category browsing (Bakers, Artisans, Bookstores, Groceries, etc.).
  
  Vendor profiles with products, photos, contact, and address.
  
  Google Maps integration for shop location and navigation.
  
  WhatsApp deep-link chat with vendors.
  
  Vendor registration and admin approval.
  
  User reviews and ratings.
  
  Simple booking/order requests.  
  
  Secure online payments (UPI, Cards, Wallets) via Razorpay/Stripe.


*1.3 Definitions*

  MVP: Minimum Viable Product (first version).
  
  Vendor: Local shopkeeper, artisan, baker, or bookstore owner.
  
  User: Customer exploring or ordering from vendors.
  
  Admin: Approves vendors, manages listings.

**2. Functional Requirements**
*2.1 User Features*

  Register/login.
  
  Select city.
  
  Browse vendors by category.
  
  View vendor profile (details, address, reviews, products).
  
  Contact vendor via WhatsApp or order request.
  
  Submit reviews & ratings.

  Make secure online payments for confirmed orders.

*2.2 Vendor Features*

  Register with shop details.
  
  Upload product images & description.
  
  Receive customer requests.
  
  Manage profile and updates.

*2.3 Admin Features*

  Verify & approve vendor registrations.
  
  Manage categories.
  
  Moderate reviews and content.

**3. Non-Functional Requirements**

  Scalability: Handle multiple cities & categories.
  
  Security: Protect user/vendor data.
  
  Performance: Fast vendor search & map loading.
  
  Usability: Simple and intuitive for newcomers.

  Security**: Payment processing must follow PCI-DSS standards.  
  
  Reliability**: Ensure transactions are confirmed or rolled back safely.  

  
**4. System Models**
*4.1 Use Case Diagram*

_(Diagram will be added later in docs/diagrams/usecase.png)_

*4.2 ER Diagram*

_(Diagram will be added later in docs/diagrams/er.png)_

*4.3 Architecture Diagram*

_(Diagram will be added later in docs/diagrams/architecture.png)_

**5. Technologies**

Frontend (Web): React.js

Frontend (Mobile): React Native

Backend: Node.js + Express

Database: MongoDB

APIs: Google Maps API, Cloudinary/S3 for images, WhatsApp deep link

Payments: Razorpay API (India) / Stripe API (global).


**6. Constraints**

MVP delivery by 30 November 2025.

Payment integration to be included after core features are stable.
