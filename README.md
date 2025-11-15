# 🚌 BusTrack - Bus Transport System

A modern, professional web-based bus tracking system designed to make public transportation easy and accessible. Built with HTML, CSS, and JavaScript.

![BusTrack Preview](https://img.shields.io/badge/Status-Ready-success)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Main Features
- **Smart Bus Stop Search** - Find bus stops quickly with real-time filtering
- **Live Capacity Tracking** - See how full each bus is before boarding
- **Detailed Route Maps** - View complete route information with all stops
- **Professional UI/UX** - Modern, responsive design that works on all devices
- **Three Page System**:
  - 🏠 **Home Page** - Search and select bus stops
  - 🚏 **Stops Page** - View all buses at a selected stop
  - 🚌 **Bus Details Page** - See complete route and capacity information

### 🎨 Design Highlights
- Gradient backgrounds with modern color schemes
- Smooth animations and transitions
- Interactive hover effects
- Capacity indicators with color coding (Green → Yellow → Red)
- Font Awesome icons throughout
- Fully responsive mobile design
- Professional navigation bar
- Social media integration ready

### 📊 Technical Features
- Pure vanilla JavaScript (no frameworks needed)
- Clean, maintainable code structure
- GitHub Pages compatible
- Session storage for state management
- URL parameters for deep linking
- Real-time search filtering
- Dynamic capacity calculations

## 🚀 Quick Start

### Option 1: GitHub Pages Deployment (Recommended)

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository on GitHub
   # Upload all files to the repository
   ```

2. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Under "Source", select your main branch
   - Click "Save"
   - Your site will be live at: `https://yourusername.github.io/repository-name/`

3. **Access Your Site**
   - Wait 1-2 minutes for deployment
   - Visit your GitHub Pages URL
   - Your Bus Transport System is now live! 🎉

### Option 2: Local Development

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/bus-transport-system.git
   cd bus-transport-system
   ```

2. **Run Locally**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with http-server package)
     npx http-server
     ```

3. **View in Browser**
   - Navigate to `http://localhost:8000`

## 📁 Project Structure

```
bus-transport-system/
├── index.html              # Home page - bus stop search
├── stops.html              # Stop details - available buses
├── busDetails.html         # Bus route details
├── projectStyle.css        # Styles for home page
├── stopsStyle.css          # Styles for stops page
├── busDetailsStyle.css     # Styles for bus details page
├── script.js               # All JavaScript functionality
└── README.md              # This file
```

## 🎮 How to Use

### For Users

1. **Search for a Bus Stop**
   - Type in the search box on the home page
   - Click on any bus stop from the list

2. **View Available Buses**
   - See all buses serving your selected stop
   - Check capacity indicators (Available/Filling Up/Almost Full)
   - Click on any bus to see detailed route information

3. **View Bus Route**
   - See complete route with all stops
   - Check estimated travel time
   - View capacity statistics
   - Identify your current stop (marked with ⭐)

### For Developers

#### Adding New Bus Stops
Edit `script.js`:
```javascript
let stops = [
    "Your New Stop",
    "Another Stop",
    // ... add more stops
];
```

#### Adding New Buses
Edit `script.js`:
```javascript
const buses = [
    {
        id: 5,  // Unique ID
        name: "Express-1",
        stops: ["Stop A", "Stop B", "Stop C"],
        filledSeats: 30,
        totalSeats: 50
    },
    // ... add more buses
];
```

#### Customizing Colors
Edit the CSS files and modify the `:root` variables:
```css
:root {
    --primary-color: #2563eb;  /* Change to your brand color */
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    /* ... more color variables */
}
```

## 🎨 Customization Guide

### Changing the Theme
All color variables are defined in the `:root` section of each CSS file. Modify these to match your brand:

```css
:root {
    --primary-color: #your-color;
    --primary-dark: #your-dark-color;
    --primary-light: #your-light-color;
}
```

### Adding New Features
The code is modular and easy to extend:
- **New pages**: Follow the same structure as existing pages
- **New data fields**: Add to the `buses` array in `script.js`
- **New animations**: Add CSS animations in the respective style files

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Dynamic functionality
- **Font Awesome 6** - Icons
- **Google Fonts (Poppins)** - Typography

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Configuration

### GitHub Pages Specific Settings

The project is already configured for GitHub Pages. The JavaScript uses relative paths that work with GitHub Pages' subdirectory structure:

```javascript
// Automatically handles GitHub Pages paths
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return page || 'index.html';
}
```

No additional configuration needed!

## 🐛 Troubleshooting

### Common Issues

**Issue**: Pages don't load on GitHub Pages
- **Solution**: Ensure all file names match exactly (case-sensitive)
- Check that GitHub Pages is enabled in repository settings

**Issue**: Styles not appearing
- **Solution**: Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Verify CSS files are in the same directory as HTML files

**Issue**: Navigation between pages not working
- **Solution**: Ensure all HTML files are in the root directory
- Check browser console for JavaScript errors

## 🚀 Future Enhancements

Potential features to add:
- [ ] Real-time GPS tracking
- [ ] Push notifications for bus arrivals
- [ ] User accounts and favorites
- [ ] Real-time updates via API
- [ ] Multi-language support
- [ ] Offline mode with service workers
- [ ] Integration with payment systems
- [ ] Admin panel for managing routes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or issues:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## 🌟 Credits

Developed with ❤️ to make public transportation easier and more accessible for everyone.

---

**Made with** ❤️ **by the BusTrack Team**

🚌 Making Transport Simple, One Stop at a Time!
