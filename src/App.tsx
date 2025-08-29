import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Drawer } from "vaul";
import html2pdf from "html2pdf.js";
import "./index.css";

interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
}

interface Education {
  school: string;
  degree: string;
  year: string;
}

interface Skill {
  skill: string;
}

interface Language {
  language: string;
  level: string;
}

interface General {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  address: string;
  jobTitle: string;
  summary: string;
}

function App() {
  const [general, setGeneral] = useState<General>({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    portfolio: "",
    address: "",
    jobTitle: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [showResume, setShowResume] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
  }, [darkMode]);

  const [form, setForm] = useState<Experience>({
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [projForm, setProjForm] = useState<Project>({
    title: "",
    description: "",
    link: "",
  });
  const [eduForm, setEduForm] = useState<Education>({
    school: "",
    degree: "",
    year: "",
  });
  const [skillForm, setSkillForm] = useState<Skill>({ skill: "" });
  const [langForm, setLangForm] = useState<Language>({
    language: "",
    level: "",
  });

  const [expOpen, setExpOpen] = useState(false);
  const [projOpen, setProjOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const resumeRef = useRef<any>(null);

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;

    const options = {
      margin: 0.5,
      filename: "my-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();

    // if (!resumeRef.current) return;
    // const canvas = await html2canvas(resumeRef.current);
    // const imgData = canvas.toDataURL("image/png");
    // const pdf = new jsPDF("p", "mm", "a4");
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save("resume.pdf");
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <div className=" mt-4 card p-3 ">
            <h5 className="mb-3">General</h5>
            <input
              className="form-control mb-2"
              placeholder="Full Name"
              value={general.name}
              onChange={(e) => setGeneral({ ...general, name: e.target.value })}
            />
            <input
              className="form-control mb-2"
              placeholder="Email Address"
              value={general.email}
              onChange={(e) =>
                setGeneral({ ...general, email: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Mobile Number"
              value={general.phone}
              onChange={(e) =>
                setGeneral({ ...general, phone: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="GitHub link..."
              value={general.github}
              onChange={(e) =>
                setGeneral({ ...general, github: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="LinkedIn link..."
              value={general.linkedin}
              onChange={(e) =>
                setGeneral({ ...general, linkedin: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Portfolio link..."
              value={general.portfolio}
              onChange={(e) =>
                setGeneral({ ...general, portfolio: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Address"
              value={general.address}
              onChange={(e) =>
                setGeneral({ ...general, address: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Job Title"
              value={general.jobTitle}
              onChange={(e) =>
                setGeneral({ ...general, jobTitle: e.target.value })
              }
            />
            <textarea
              className="form-control mb-2"
              rows={3}
              placeholder="Summary (About Yourself)"
              value={general.summary}
              onChange={(e) =>
                setGeneral({ ...general, summary: e.target.value })
              }
            />
          </div>
          <button
            className=" mt-3   btn btn-outline-secondary w-100"
            onClick={() => setShowResume(true)}
          >
            + ALL SAVE
          </button>
        </div>

        <div className="col-md-8">
          {/* EXPERIENCES */}
          <h5>Experiences</h5>
          <ul className="list-group mb-3 d-flex flex-row flex-wrap gap-2">
            {experiences.map((exp, i) => (
              <li
                key={i}
                className="list-group-item text-center"
                style={{ width: "150px", height: "100px", overflow: "hidden" }}
              >
                <h6>{exp.company}</h6>
              </li>
            ))}
          </ul>
          <Drawer.Root open={expOpen} onOpenChange={setExpOpen}>
            <Drawer.Trigger asChild>
              <button className="btn btn-outline-secondary w-100">
                + Add new item
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-secondaryx flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
                <div className="max-w-md w-full mx-auto overflow-auto p-4">
                  <Drawer.Handle />
                  <Drawer.Title className="font-medium text-gray-900 my-6">
                    Your Experiences
                  </Drawer.Title>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Role"
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="date"
                      className="form-control"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      className="form-control"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({ ...form, endDate: e.target.value })
                      }
                    />
                  </div>
                  <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  ></textarea>
                  <button
                  style={{
                    borderColor: darkMode ? "#ffffff" : "#212529",
                    color: darkMode ? "#ffffff" : "black",
                    backgroundColor: darkMode ? "transparent" : "transparent",
                  }}
                    className=" btn btn-secondary w-100"
                    onClick={() => {
                      setExperiences([form, ...experiences]);
                      setForm({
                        company: "",
                        role: "",
                        location: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      });
                      setExpOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>

          {/* PROJECTS */}
          <h5 className="mt-4">Projects</h5>
          <ul className="list-group mb-3 d-flex flex-row flex-wrap gap-2">
            {projects.map((p, i) => (
              <li
                key={i}
                className="list-group-item text-center"
                style={{ width: "150px", height: "100px", overflow: "hidden" }}
              >
                {p.title}
              </li>
            ))}
          </ul>
          <Drawer.Root open={projOpen} onOpenChange={setProjOpen}>
            <Drawer.Trigger asChild>
              <button className="btn btn-outline-secondary w-100">
                + Add new item
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-secondaryx flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
                <div className="max-w-md w-full mx-auto overflow-auto p-4">
                  <Drawer.Handle />
                  <Drawer.Title className="font-medium text-gray-900 my-6">
                    Add Project
                  </Drawer.Title>
                  <input
                    className="form-control mb-2"
                    placeholder="Title"
                    value={projForm.title}
                    onChange={(e) =>
                      setProjForm({ ...projForm, title: e.target.value })
                    }
                  />
                  <textarea
                    className="form-control mb-2" 
                    placeholder="Description"
                    value={projForm.description}
                    onChange={(e) =>
                      setProjForm({ ...projForm, description: e.target.value })
                    }
                  ></textarea>
                  <input
                    className="form-control mb-3"
                    placeholder="Link"
                    value={projForm.link}
                    onChange={(e) =>
                      setProjForm({ ...projForm, link: e.target.value })
                    }
                  />
                  <button
                  style={{
                    borderColor: darkMode ? "#ffffff" : "#212529",
                    color: darkMode ? "#ffffff" : "black",
                    backgroundColor: darkMode ? "transparent" : "transparent",
                  }}
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setProjects([projForm, ...projects]);
                      setProjForm({ title: "", description: "", link: "" });
                      setProjOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>

          {/* EDUCATION */}
          <h5 className="mt-4">Education</h5>
          <ul className="list-group mb-3 d-flex flex-row flex-wrap gap-2">
            {educations.map((e, i) => (
              <li
                key={i}
                className="list-group-item text-center"
                style={{ width: "150px", height: "100px", overflow: "hidden" }}
              >
                {e.school}
              </li>
            ))}
          </ul>
          <Drawer.Root open={eduOpen} onOpenChange={setEduOpen}>
            <Drawer.Trigger asChild>
              <button className="btn btn-outline-secondary w-100">
                + Add new item
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-secondaryx flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
                <div className="max-w-md w-full mx-auto overflow-auto p-4">
                  <Drawer.Handle />
                  <Drawer.Title className="font-medium text-gray-900 my-6">
                    Add Education
                  </Drawer.Title>
                  <input
                    className="form-control mb-2"
                    placeholder="School"
                    value={eduForm.school}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, school: e.target.value })
                    }
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Degree"
                    value={eduForm.degree}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, degree: e.target.value })
                    }
                  />
                  <input
                  type="date"
                    className="form-control mb-3"
                    placeholder="date"
                    value={eduForm.year}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, year: e.target.value })
                    }
                  />
                  <input
                  type="date"
                    className="form-control mb-3"
                    placeholder="date"
                    value={eduForm.year}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, year: e.target.value })
                    }
                  />
                    <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  ></textarea>
                  <button
                   style={{
                     borderColor: darkMode ? "#ffffff" : "#212529",
                     color: darkMode ? "#ffffff" : "black",
                     backgroundColor: darkMode ? "transparent" : "transparent",
                   }}
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setEducations([eduForm, ...educations]);
                      setEduForm({ school: "", degree: "", year: "" });
                      setEduOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>

          {/* SKILLS */}
          <h5 className="mt-4">Skills</h5>
          <ul className="list-group mb-3 d-flex flex-row flex-wrap gap-2">
            {skills.map((s, i) => (
              <li
                key={i}
                className="list-group-item text-center"
                style={{ width: "150px", height: "100px", overflow: "hidden" }}
              >
                {s.skill}
              </li>
            ))}
          </ul>
          <Drawer.Root open={skillOpen} onOpenChange={setSkillOpen}>
            <Drawer.Trigger asChild>
              <button className="btn btn-outline-secondary w-100">
                + Add new item
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-secondaryx flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
                <div className="max-w-md w-full mx-auto overflow-auto p-4">
                  <Drawer.Handle />
                  <Drawer.Title className="font-medium text-gray-900 my-6">
                    Add Skill
                  </Drawer.Title>
                  <input
                    className="form-control mb-3"
                    placeholder="Skill"
                    value={skillForm.skill}
                    onChange={(e) => setSkillForm({ skill: e.target.value })}
                  />
                  <button
                   style={{
                    borderColor: darkMode ? "#ffffff" : "#212529",
                    color: darkMode ? "#ffffff" : "black",
                    backgroundColor: darkMode ? "transparent" : "transparent",
                  }}
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setSkills([skillForm, ...skills]);
                      setSkillForm({ skill: "" });
                      setSkillOpen(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>

          {/* LANGUAGES */}
          <h5 className="mt-4">Languages</h5>
          <ul className="list-group mb-3 d-flex flex-row flex-wrap gap-2">
            {languages.map((l, i) => (
              <li
                key={i}
                className="list-group-item text-center"
                style={{ width: "150px", height: "100px", overflow: "hidden" }}
              >
                {l.language} - {l.level}
              </li>
            ))}
          </ul>
          <Drawer.Root open={langOpen} onOpenChange={setLangOpen}>
  <Drawer.Trigger asChild>
    <button className="btn btn-outline-secondary w-100">
      + Add new item
    </button>
  </Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
    <Drawer.Content className="bg-secondaryx flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
      <div className="max-w-md w-full mx-auto overflow-auto p-4">
        <Drawer.Handle />
        <Drawer.Title className="font-medium text-gray-900 my-6">
          Add Language
        </Drawer.Title>
        <input
          className="form-control mb-2"
          placeholder="Language"
          value={langForm.language}
          onChange={(e) =>
            setLangForm({ ...langForm, language: e.target.value })
          }
        />
        <select
          className="form-control mb-3"
          value={langForm.level}
          onChange={(e) => setLangForm({ ...langForm, level: e.target.value })}
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Fluent">Fluent</option>
        </select>

        <button 
         style={{
           borderColor: darkMode ? "#ffffff" : "#212529",
           color: darkMode ? "#ffffff" : "black",
           backgroundColor: darkMode ? "transparent" : "transparent",
         }}
          className="btn btn-secondary w-100"
          onClick={() => {
            if (!langForm.language || !langForm.level) return;
            setLanguages([langForm, ...languages]);
            setLangForm({ language: "", level: "" });
            setLangOpen(false);
          }}
        >
          Save
        </button>
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>

        </div>
      </div>

      {showResume && (
        <div className="mt-5">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="btn btn-primary position-relative "
          >
            DOWLON PDF{" "}
            <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
              <span className="visually-hidden">DAWLON PDF</span>
            </span>
          </button>
          <div
            className="border p-4"         
            style={{ maxWidth: "800px", margin: "auto" }}
            ref={resumeRef}
          >
            <h2>{general.name}</h2>
            <h5>{general.jobTitle}</h5>
            <p>
              {general.address} | {general.phone} | {general.email}
            </p>
            <p>
              <a href={general.github}>Github</a> |{" "}
              <a href={general.linkedin}>LinkedIn</a> |{" "}
              <a href={general.portfolio}>Website</a>
            </p>
            <p>{general.summary}</p>

            <h6>EXPERIENCE</h6>
            {experiences.map((exp, i) => (
              <div key={i}>
                <strong>{exp.company}</strong> - {exp.role} ({exp.startDate} -{" "}
                {exp.endDate})<br />
                {exp.location}
                <br />
                {exp.description}
              </div>
            ))}

            <h6>PROJECTS</h6>
            {projects.map((p, i) => (
              <div key={i}>
                {p.title} - <a href={p.link}>{p.link}</a>
                <br />
                {p.description}
              </div>
            ))}

            <h6>EDUCATION</h6>
            {educations.map((e, i) => (
              <div key={i}>
                {e.school} - {e.degree} ({e.year})
              </div>
            ))}

            <h6>SKILLS</h6>
            <p>{skills.map((s) => s.skill).join(", ")}</p>

            <h6>LANGUAGES</h6>
            {languages.map((l, i) => (
              <div key={i}>
                {l.language} - {l.level}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
