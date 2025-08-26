import { useState } from "react";

export default function ExperienceForm({
  onSave,
}: {
  onSave: (exp: any) => void;
}) {
  const [exp, setExp] = useState({
    company: "",
    role: "",
    location: "",
    start: "",
    end: "",
    desc: "",
  });

  const handleSave = () => {
    onSave(exp);
    setExp({
      company: "",
      role: "",
      location: "",
      start: "",
      end: "",
      desc: "",
    });
  };

  return (
    <div className="card p-3 mt-2">
      <input
        className="form-control mb-2"
        placeholder="Company Name"
        value={exp.company}
        onChange={(e) => setExp({ ...exp, company: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Role"
        value={exp.role}
        onChange={(e) => setExp({ ...exp, role: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Location"
        value={exp.location}
        onChange={(e) => setExp({ ...exp, location: e.target.value })}
      />
      <div className="d-flex gap-2">
        <input
          className="form-control mb-2"
          placeholder="Start Date"
          value={exp.start}
          onChange={(e) => setExp({ ...exp, start: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="End Date"
          value={exp.end}
          onChange={(e) => setExp({ ...exp, end: e.target.value })}
        />
      </div>
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={exp.desc}
        onChange={(e) => setExp({ ...exp, desc: e.target.value })}
      />
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
