import { capabilities } from '@/lib/site';

export function Solutions() {
  return (
    <div className="solutions-list">
      {capabilities.map(capability => (
        <article className="capability" key={capability.title}>
          <h3>{capability.title}</h3>
          <p>{capability.description}</p>
        </article>
      ))}
    </div>
  );
}
