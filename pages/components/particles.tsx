import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
const Particle = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
    
        await loadFull(engine);
        }, []);
        const particlesLoaded = useCallback(async (container: Container | undefined) => {
          //await console.log(container);
        }, []);
        return (
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} 
         options={{
          background: {
              color: {
                  value: "#000000",
              },
          },
          fpsLimit: 60,
          interactivity: {
              events: {
                  onClick: {
                      enable: false,
                      mode: "push",
                  },
                  onHover: {
                      enable: false,
                      mode: "repulse",
                  },
                  resize: true,
              },
              modes: {
                  push: {
                      quantity: 4,
                  },
                  repulse: {
                      distance: 200,
                      duration: 0.4,
                  },
              },
          },
          particles: {
              color: {
                  value: "#ffffff",
              },
              links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
              },
              collisions: {
                  enable: true,
              },
              move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                      default: "bounce",
                  },
                  random: true,
                  speed: .8,
                  straight: false,
              },
              number: {
                  density: {
                      enable: true,
                      area: 800,
                  },
                  value: 100,
              },
              opacity: {
                  value: 0.5,
                  random: true
              },
              shape: {
                  type: "circle",
              },
              size: {
                  value: { min: 1, max: 5 },
              },
          },
          detectRetina: true,
      }}
      />
    );
}
export default Particle;