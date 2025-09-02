# Content Management System (CMS)

🚀 A modern, full-featured Product Management System built with Next.js, Express.js, and MySQL.

![CMS Dashboard](https://img.shields.io/badge/Status-Live-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Express%20%7C%20MySQL-blue)

## ✨ Features

- 📦 **Complete Product Management**: Add, edit, delete, and manage products
- 🔄 **Real-time Updates**: Instant content updates across the system
- 🌐 **Live Preview**: View published products as they appear to visitors
- 🗃️ **Soft Delete**: Safe deletion with recovery options
- 📊 **Status Management**: Draft, Published, and Archived states
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔍 **Audit Trail**: Complete tracking of who created/updated what and when

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Styling**: Tailwind CSS with custom gradients and animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/SkAbuTahir/Content-Management-System.git
cd Content-Management-System
```

### 2. Database Setup
```sql
# Login to MySQL
mysql -u root -p

# Run the initialization script
source init.sql
```

### 3. Backend Setup
```bash
cd api
npm install
npm start
```
🌐 Backend runs on: http://localhost:5000

### 4. Frontend Setup
```bash
cd web
npm install
npm run dev
```
🌐 Frontend runs on: http://localhost:3000

## 📱 Usage

1. **Access CMS Dashboard**: Navigate to http://localhost:3000
2. **Add Products**: Use the form to create new products
3. **Manage Products**: Edit, delete, or change status of existing products
4. **View Live Products**: Click "View Live Products" to see published content
5. **Live Preview**: Visit http://localhost:3000/live to see the public view

## 🗄️ Database Schema

```sql
CREATE TABLE Products (
    product_id      INT AUTO_INCREMENT PRIMARY KEY,
    product_name    VARCHAR(100) NOT NULL,
    product_desc    TEXT,
    status          ENUM('Draft', 'Published', 'Archived') DEFAULT 'Draft',
    created_by      VARCHAR(50) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by      VARCHAR(50),
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted      BOOLEAN DEFAULT FALSE
);
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products (excluding deleted) |
| GET | `/products/live` | Get published products only |
| GET | `/products/:id` | Get single product |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Soft delete product |

## 🎨 Screenshots

### CMS Dashboard
- Modern, intuitive interface
- Real-time product management
- Status indicators and actions

### Live Products View
- Clean, public-facing display
- Only shows published products
- Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abu Tahir**
- Email: 36abustudy@gmail.com
- GitHub: [@SkAbuTahir](https://github.com/SkAbuTahir)

## 🙏 Acknowledgments

- Built as part of a comprehensive CMS assignment
- Implements modern web development best practices
- Focuses on user experience and performance

---

⭐ **Star this repository if you found it helpful!**