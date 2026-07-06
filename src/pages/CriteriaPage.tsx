import { criteriaGroups, criteriaItems } from '../data/seed';

export default function CriteriaPage() {
  return (
    <section className="page">
      {criteriaGroups.map((g) => (
        <div className="panel" key={g.id}>
          <div className="section-head"><h2>{g.name} <small>({g.maxScore} điểm)</small></h2><button>+ Tiêu chí</button></div>
          <table><thead><tr><th>Tiêu chí</th><th>Điểm tối đa</th><th>Minh chứng</th><th>Ghi chú</th></tr></thead>
          <tbody>{criteriaItems.filter((i) => i.groupId === g.id).map((i) => <tr key={i.id}><td>{i.name}</td><td>{i.maxScore}</td><td>{i.requiredEvidence ? 'Bắt buộc' : 'Không bắt buộc'}</td><td>{i.description || '-'}</td></tr>)}</tbody></table>
        </div>
      ))}
    </section>
  );
}
