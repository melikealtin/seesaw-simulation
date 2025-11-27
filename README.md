# Seesaw Simulation

This is a physics simulation. Users can click on the seesaw to drop objects. Each object has a random weight between 1-10 kg. The seesaw tilts based on torque calculation.

## Technologies

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**

> No frameworks or libraries were used.

## 📁 Project Structure

```
├── index.html
├── main.css
├── app.js
└── models/
    ├── CanvasScene.js
    ├── Seesaw.js
    └── Weight.js
```

## My Thought Process and Design Decisions

I used class structure in this project because I think it models real life objects better. For example, the seesaw is one object and the weights are other objects. Each object has its own job. This makes the code easier to read. When I change something in one place, I don't break other parts.

I used Canvas because it is very fast for animations. The seesaw moves and the weights fall down. Canvas makes it easy to control these drawings pixel by pixel. Also, functions like rotate and translate helped me to turn the seesaw from its center point.

## AI Usage

- I got help from AI for Canvas drawing functions like `arc`, `rotate`, `translate`

## Video Explanation

[Watch the project walkthrough](https://drive.google.com/file/d/1PyNw8NBThU7FJe8MlhMBW25zSiqR58BA/view)
