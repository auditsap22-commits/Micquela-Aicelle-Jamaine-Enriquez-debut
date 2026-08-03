'use client';

import React, { useMemo } from 'react';
import './invite-particles.css';

interface InviteParticlesProps {
  count?: number;
  palette?: readonly string[];
}

function buildParticleSeeds(count: number, palette?: readonly string[]) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${((index * 17 + 7) % 96) + 2}%`,
    top: `${((index * 23 + 11) % 94) + 3}%`,
    size: 2 + (index % 4),
    delay: (index * 0.37) % 6,
    duration: 8 + (index % 5) * 2.4,
    opacity: 0.18 + (index % 5) * 0.07,
    color: palette?.length
      ? palette[index % palette.length]
      : `var(--particle-${(index % 4) + 1})`,
  }));
}

export function InviteParticles({ count = 28, palette }: InviteParticlesProps) {
  const particles = useMemo(
    () => buildParticleSeeds(count, palette),
    [count, palette],
  );

  return (
    <div className="invite-particles__field" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="invite-particles__particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            ['--particle-opacity' as string]: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
