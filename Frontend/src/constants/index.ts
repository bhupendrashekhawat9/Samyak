
// import mountainMover2324 from "/assets/awards/mountainMover(2324).jpeg"
// import mountainMover2425 from "/assets/awards/mountainMover(2425).png"
// import risingStar from "/assets/awards/risingStar.png"


export const LINKEDIN = "www.linkedin.com/in/bhupendra-singh-shekawat-8632a7242"
export const GITHUB = "https://github.com/bhupendrashekhawat9/"
export const HERO_TITLE = "Software Engineer"
export const HERO_CONTENT = "I am a passionate full-stack developer with nearly 3 years of experience in building robust and scalable web applications. I specialize in front-end technologies like React and Next.js, as well as back-end tools like Node.js, MySQL, and MongoDB. My goal is to use my skills to create innovative solutions that enhance business growth and improve user experiences.";

export const ABOUT_TEXT = `<p>I am a dedicated and versatile full-stack developer with a passion for building simple, efficient, and user-friendly web applications. With nearly 3 years of experience, I have worked with technologies like React, Next.js, Node.js, MySQL, Java, and MongoDB. My journey in web development started with a deep curiosity about how websites are built, and it has grown into a career where I continuously learn and adapt to new challenges. I thrive in collaborative environments and love solving complex problems to deliver high-quality, straightforward solutions.</p>
<br/>
<p>
Outside of coding, I enjoy working on DIY projects, exploring jungles, reading about new technologies, and diving into open-source code.
</p>`

export const EXPERIENCES = [
  {
    year: "October-2024 - Present",
    role: "Software Engineer",
    company: "Incture Technologies",
    description: `Led a team in developing and maintaining Single Page web applications using JavaScript/Typescript,
    optimized system performance by implementing efficient algorithams and data stuctures, created custom hooks and and state management libraries like redux, and reacts context api to to reduce api calls improing performance by 50%.
    Maintained and contributed to private NPM artifacts,Collaborated with clients for requirement gathering and led solutioning.`,
    technologies: ["Typescript", "React.js","Nodejs","NPM","Azure","Redux","Material UI", "Tailwind CSS"],
    awards:[
      {
        title:"Mountain Mover",
        img:"/assets/awards/mountainMover(2425).png"
      }
    ]
  },
  {
    year: "October-2022 - September-2024",
    role: "Associate Software Engineer",
    company: "Incture Technologies",
    description: `Designed and developed user interfaces for web applications using React and Typescript, Implemented opens-source and incture's private NPM artifacts. Worked closely with backend developers to integrate frontend components with APIs. Following best web compatibility practices, Implemented responsive designs and optimized frontend performance.`,
    technologies: ["HTML", "CSS", "Typescript","React","Material UI","Java","mySQL","NPM","Azure","IndexedDB"],
    awards:[
      {
        title:"Mountain Mover",
        img:"/assets/awards/mountainMover(2425).png"
      },
      {
        title:"Rising Star",
        img:"/assets/awards/risingStar.png"
      }
    ]
  },
  {
    year: "July-2022 - September-2022",
    role: "Internship",
    company: "Incture Technologies",
    description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
    technologies: ["Nodejs", "Javascript", "Material UI", "IndexedDB"],
    awards:[
  ]

  }
];

export const SKILLS = {"Frontend": [
  {
    title:"React js",
    score:5
  },{
    title:"Typescript",
    score:5
  },{
    title:"Javascript",
    score:5
  },{
    title:"HTML & CSS",
    score:5
  },
  {
    title:"Redux",
    score:5
  }
],
"Backend":[
  {
    title:"Node js",
    score:5
  },{
    title:"MongoDB",
    score:5
  },
  {
    title:"mySQL",
    score:5
  },
  {
    title:"Express js",
    score:5
  },
]
}
export const PROJECTS = [
  {
    title: "Dhanmitra",
    link:"https://dhanmitra.netlify.app",
    image: "./assets/projects/Dhanmitra/logo.svg",
    description:
      "Multi platform application to manage and create budgets, built with a purpose the solve the problem of difficulty in tracing expenditures and bringing a sense of discpline",
    technologies: ["React","Typescript","CSS", "Node.js", "IndexDB"],
    tags:[
      {
        title:"Source Code",
        icon:"Github",
        link:"https://github.com/bhupendrashekhawat9/Dhanmitra"
      }
    ],
    status: "Completed"
  },
  {
    title: "Trade Diary App",
    link:"",
    image: "../assets/projects/project-1.jpg",
    description:
      "An application for managing and reviewing daily trades taken on Upstox, allows user to attach screenshots and comments on trades with other details specific to the trade, and also a dashboard with kpis",
    technologies: ["React", "Typescript", "NodeJs", "mySql","ExpressJs", "CSS"],
    tags:[
      {
        title:"Source Code",
        icon:"Github",
        link:"https://github.com/bhupendrashekhawat9/Trade-Diary"
      }
    ],
    status: "In Progress"

  },
];

export const CONTACT = {
  address: "Bhubaneshwar, Odisha, India",
  phoneNo: "+91-9114119039",
  email: "connect@bhupendrashekawat.in",
};