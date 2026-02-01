import React, { useEffect, useRef } from 'react'; // Added useEffect and useRef here
import './Dashboard.css';

function Dashboard() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let petals = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Petal {
            constructor() {
                this.reset();
                // Randomize initial Y so they don't all start at the top at once
                this.y = Math.random() * window.innerHeight;
            }
            reset() {
                this.x = Math.random() * window.innerWidth;
                this.y = -20;
                this.size = Math.random() * 5 + 2;
                this.speedY = Math.random() * 0.8 + 0.4;
                this.speedX = Math.random() * 1 - 0.5;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = Math.random() * 0.02;
            }
            update() {
                this.y += this.speedY;
                // Added the sine wave movement you had for a nice "drift" effect
                this.x += this.speedX + Math.sin(this.y / 60) * 0.5;
                this.angle += this.spin;
                if (this.y > window.innerHeight) this.reset();
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.beginPath();
                // Drawing the petal shape
                ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 183, 197, 0.6)';
                ctx.fill();
                ctx.restore();
            }
        }

        const init = () => {
            petals = Array.from({ length: 300 }, () => new Petal());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="dashboard-wrapper">
            <canvas ref={canvasRef} className="blog-sakura-canvas" />
            <div className="content">
                <h1>Hello World</h1>
                <p>Welcome to the dashboard!</p>
            </div>
        </div>
    );
}

export default Dashboard;