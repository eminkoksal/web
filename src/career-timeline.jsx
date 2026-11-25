/* The career as a timeline of nodes on one edge (Emin Style v1.2). Used on an ink band
   by the About page and the CV page. Styles: .v2-time in public/assets/v2.css. */
import React from 'react';

/* The career, in order. side/level/right place a label on the wide layout (above or below
   the line, one or two rows out, text to the left of its leader near the right edge);
   ai marks the AI-native work, drawn in coral. Years as in the CV (cv-data.jsx). */
const TIMELINE = [
{ year: 2001, text: 'BA in Economics, Galatasaray University', side: 'up' },
{ year: 2002, text: 'Research Assistant, Bahçeşehir University', side: 'down' },
{ year: 2008, text: 'PhD in Economics, Marmara University; Assistant Professor', side: 'up' },
{ year: 2013, text: 'Vice Dean; coordinator of the Financial Economics graduate program', side: 'down' },
{ year: 2015, text: 'Economic Consultant, Dentons', side: 'up' },
{ year: 2018, text: 'Associate Professor; Associate Editor-in-Chief of a SAGE journal', side: 'down' },
{ year: 2024, text: 'Co-editor, Routledge volume on digitalization in Türkiye', side: 'up', right: true },
{ year: 2025, text: 'First AI-native paper: 3,369 infringement decisions', side: 'down', level: 2, right: true, ai: true },
{ year: 2026, text: 'Second paper: 18,513 citations mapped as a network', side: 'up', level: 2, right: true, ai: true }];
const T0 = 2001, T1 = 2027;


function CareerTimeline() {
  return (
    <div className="v2-time" data-reveal>
      <span className="v2-time__line v2-draw" aria-hidden="true" />
      <ol>
        {TIMELINE.map((e, i) =>
        <li key={e.year}
        className={'is-' + e.side + (e.level === 2 ? ' is-l2' : '') + (e.right ? ' is-right' : '') + (e.ai ? ' is-ai' : '')}
        style={{ '--t': (e.year - T0) / (T1 - T0), '--i': i + 2 }} data-r>
          <div className="v2-time__label"><b>{e.year}</b>{e.text}</div>
        </li>
        )}
      </ol>
    </div>);
}

export default CareerTimeline;
