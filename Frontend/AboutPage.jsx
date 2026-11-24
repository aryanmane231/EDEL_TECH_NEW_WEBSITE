import { useLayoutEffect, useRef } from 'react';
import content from '../content/about.html?raw';

export default function AboutPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    // The imported HTML was originally a standalone page. Its scripts do not
    // run when injected into React, so explicitly unhide the About section and timeline.
    const about = root.querySelector('#about');
    if (about) {
      about.style.setProperty('display', 'block', 'important');
      about.style.setProperty('visibility', 'visible', 'important');
      about.style.setProperty('opacity', '1', 'important');
      about.style.setProperty('height', 'auto', 'important');
      about.style.setProperty('overflow', 'visible', 'important');
    }

    const timelineSection = root.querySelector('.timeline-section');
    const timeline = root.querySelector('.timeline-section .timeline');
    [timelineSection, timeline].filter(Boolean).forEach((element) => {
      element.style.setProperty('display', element === timeline ? 'flex' : 'block', 'important');
      element.style.setProperty('visibility', 'visible', 'important');
      element.style.setProperty('opacity', '1', 'important');
      element.style.setProperty('height', 'auto', 'important');
      element.style.setProperty('overflow', 'visible', 'important');
    });

    const milestones = [...root.querySelectorAll('.timeline .milestone')];
    milestones.forEach((milestone) => {
      milestone.classList.add('reveal');
      milestone.classList.remove('visible');
    });

    // Reveal each milestone as it enters the viewport. The observer also
    // removes the state when scrolling back above it, so the animation plays
    // again when the user scrolls through the timeline in either direction.
    const revealTargets = [...root.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          target.classList.toggle('visible', isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={pageRef}
      className="route-page about-route"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
