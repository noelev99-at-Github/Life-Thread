import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8000/me', { 
                    withCredentials: true 
                });
                
                if (response.status === 200) {
                    setIsAuthorized(true);
                }
            } catch (err) {
                console.log('Auth check failed:', err.response?.data || err.message);
                setIsAuthorized(false);
                navigate('/'); 
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [navigate]);

    // Sakura animation ----------------------------------------------------------------------------
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!isAuthorized) return;
        
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
                this.x += this.speedX + Math.sin(this.y / 60) * 0.5;
                this.angle += this.spin;
                if (this.y > window.innerHeight) this.reset();
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.beginPath();
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
    }, [isAuthorized]);

    if (isChecking || !isAuthorized) {
        return null; 
    }

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