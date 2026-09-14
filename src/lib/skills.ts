export interface SkillEntry {
  id: string;
  name: string;
  href: string;
  category: string;
  keywords: string[];
}

// Plain-data mirror of src/Components/skills/skills-data.ts (name/category/keywords/href only,
// no icon component) — kept as a separate leaf file so api/mcp.ts never pulls react-icons/JSX
// into a serverless function's dependency graph.
export const SKILLS: SkillEntry[] = [
  { id: "aws", name: "AWS", href: "https://aws.amazon.com/", category: "cloud", keywords: ["amazon", "cloud", "ec2", "s3", "lambda", "infrastructure"] },
  { id: "angular", name: "Angular 17+", href: "https://angular.dev/", category: "frontend", keywords: ["typescript", "google", "framework", "spa", "single page application", "components", "directives", "services", "dependency injection", "rxjs", "observables", "reactive", "signals", "standalone components", "control flow", "deferrable views", "ssr", "server side rendering", "hydration", "angular cli", "ng", "modules", "routing", "forms", "reactive forms", "template driven forms", "pipes", "guards", "interceptors", "zoneless", "ivy", "esbuild", "vite"] },
  { id: "css3", name: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", category: "frontend", keywords: ["styles", "styling", "web", "design"] },
  { id: "docker", name: "Docker", href: "https://www.docker.com/", category: "devops", keywords: ["container", "kubernetes", "deploy", "containerization"] },
  { id: "firebase", name: "Firebase", href: "https://firebase.google.com", category: "cloud", keywords: ["google", "baas", "realtime", "auth", "database"] },
  { id: "gcp", name: "Google Cloud", href: "https://cloud.google.com", category: "cloud", keywords: ["google", "cloud", "gcp", "infrastructure"] },
  { id: "github", name: "GitHub", href: "https://www.github.com", category: "tools", keywords: ["git", "version control", "repository", "code"] },
  { id: "html5", name: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", category: "frontend", keywords: ["markup", "web", "semantic", "structure"] },
  { id: "java", name: "Java", href: "https://www.java.com/en/", category: "language", keywords: ["jvm", "spring", "enterprise", "backend"] },
  { id: "javascript", name: "JavaScript", href: "https://www.javascript.com", category: "language", keywords: ["js", "ecmascript", "web", "frontend", "node"] },
  { id: "python", name: "Python", href: "https://www.python.org/", category: "language", keywords: ["flask", "scripting", "backend", "api", "rest"] },
  { id: "jenkins", name: "Jenkins", href: "https://www.jenkins.io/", category: "devops", keywords: ["ci", "cd", "pipeline", "automation", "build"] },
  { id: "mysql", name: "MySQL", href: "https://www.mysql.com/", category: "database", keywords: ["sql", "relational", "oracle", "database"] },
  { id: "mongodb", name: "MongoDB", href: "https://mongodb.com", category: "database", keywords: ["nosql", "document", "atlas", "database"] },
  { id: "postgresql", name: "PostgreSQL", href: "https://www.postgresql.org/", category: "database", keywords: ["sql", "relational", "postgres", "database"] },
  { id: "react", name: "React", href: "https://reactjs.org", category: "frontend", keywords: ["jsx", "hooks", "components", "ui", "library"] },
  { id: "nodejs", name: "Node.js", href: "https://nodejs.org/", category: "backend", keywords: ["node", "javascript", "runtime", "server", "backend", "api", "express"] },
  { id: "express", name: "Express", href: "https://expressjs.com/", category: "backend", keywords: ["node", "api", "rest", "server", "middleware", "backend", "http"] },
  { id: "flask", name: "Flask", href: "https://flask.palletsprojects.com/", category: "backend", keywords: ["python", "api", "rest", "restful", "server", "microframework", "backend", "http", "insomnia"] },
  { id: "rails", name: "Ruby on Rails", href: "https://rubyonrails.org/", category: "backend", keywords: ["ruby", "mvc", "api", "web", "framework"] },
  { id: "splunk", name: "Splunk", href: "https://www.splunk.com/", category: "devops", keywords: ["logging", "monitoring", "observability", "analytics"] },
  { id: "tailwindcss", name: "Tailwind CSS", href: "https://tailwindcss.com/", category: "frontend", keywords: ["css", "utility", "design", "styling"] },
  { id: "typescript", name: "TypeScript", href: "https://www.typescriptlang.org/", category: "language", keywords: ["javascript", "types", "static", "ts", "microsoft"] },
  { id: "vercel", name: "Vercel", href: "https://vercel.com/", category: "cloud", keywords: ["hosting", "deploy", "next", "serverless"] },
  { id: "railway", name: "Railway", href: "https://railway.app/", category: "cloud", keywords: ["hosting", "deploy", "cloud", "postgres", "redis", "infrastructure", "paas"] },
  { id: "springboot", name: "Springboot", href: "https://spring.io/projects/spring-boot", category: "backend", keywords: ["java", "open-source", "framework", "spring ecosystem", "convention over configuration", "opinionated defaults", "standalone applications", "microservices", "web applications", "production-grade", "auto-configuration", "embedded server", "tomcat", "jetty", "undertow", "rest apis", "maven", "gradle", "dependency injection", "inversion of control", "spring initializr", "actuator", "monitoring", "metrics", "health checks", "externalized configuration", "profiles", "spring data", "jpa", "security", "authentication", "authorization"] },
  { id: "sql-developer", name: "SQL Developer", href: "https://www.oracle.com/database/sqldeveloper/", category: "tools", keywords: ["oracle", "database", "sql", "plsql", "pl/sql", "ide", "query", "schema", "data modeling", "database administration", "dba", "stored procedures", "triggers", "packages", "functions", "views", "indexes", "sequences", "tables", "relational", "rdbms", "data migration", "sql tuning", "explain plan", "performance", "debugging", "version control", "reports", "data export", "data import", "connections", "worksheets"] },
  { id: "harness", name: "Harness", href: "https://www.harness.io/", category: "tools", keywords: ["harness", "software delivery", "devops", "continuous delivery", "cd", "gitops", "continuous integration", "ci", "feature management", "feature flags", "experimentation", "infrastructure as code", "iac", "resilience testing", "chaos engineering", "ai sre", "database devops", "artifact registry", "internal developer portal", "idp", "software engineering insights", "sei", "security testing orchestration", "supply chain security", "application security", "cloud cost management", "cost optimization", "ai test automation", "ai native", "platform engineering", "devops platform", "deployment automation", "rollback", "release management", "engineering productivity"] },
  { id: "sonarqube", name: "SonarQube", href: "https://www.sonarsource.com/products/sonarqube/", category: "tools", keywords: ["sonarqube", "automated code review", "code quality", "code security", "static analysis", "devops integration", "quality gates", "code intelligence", "ide integration", "continuous inspection"] },
  { id: "newrelic", name: "New Relic", href: "https://newrelic.com/", category: "tools", keywords: ["new relic", "observability", "full stack monitoring", "apm", "infrastructure monitoring", "logs", "traces", "synthetic monitoring", "kubernetes monitoring", "cloud monitoring", "alerts", "dashboards", "incident response", "anomaly detection", "ai observability", "error tracking", "mttr", "usage based pricing", "engineering productivity"] },
  { id: "shopify", name: "Shopify", href: "https://www.shopify.com/", category: "tools", keywords: ["shopify", "commerce platform", "ecommerce", "online store", "point of sale", "pos", "multichannel selling", "b2b ecommerce", "global selling", "shopify checkout", "shopify payments", "shopify shipping", "shopify markets", "shopify apps", "shopify themes", "shopify magic", "ai for commerce", "headless commerce", "hydrogen", "merchant tools"] },
  { id: "unqork", name: "Unqork", href: "https://www.credly.com/badges/5d0058f6-76f3-4f9a-ba0e-09986557bf7c/public_url", category: "tools", keywords: ["unqork", "creator", "certification", "certified", "no-code", "low-code", "enterprise", "academy", "credly", "visual", "configuration"] },
  { id: "claude-code", name: "Claude Code", href: "https://claude.ai/", category: "tools", keywords: ["ai", "anthropic", "assistant", "coding", "llm", "claude", "ai coding", "code generation"] },
  { id: "ruby", name: "Ruby", href: "https://www.ruby-lang.org/", category: "language", keywords: ["rails", "scripting", "backend", "gems"] },
  { id: "terraform", name: "Terraform", href: "https://www.terraform.io/", category: "devops", keywords: ["iac", "infrastructure as code", "hashicorp", "cloud", "provisioning"] },
  { id: "cypress", name: "Cypress", href: "https://www.cypress.io/", category: "tools", keywords: ["e2e", "testing", "end to end", "browser", "integration"] },
  { id: "selenium", name: "Selenium", href: "https://www.selenium.dev/", category: "tools", keywords: ["e2e", "testing", "browser automation", "webdriver"] },
  { id: "jest", name: "Jest", href: "https://jestjs.io/", category: "tools", keywords: ["testing", "unit", "coverage", "javascript", "react"] },
  { id: "cucumber", name: "Cucumber", href: "https://cucumber.io/", category: "tools", keywords: ["bdd", "testing", "gherkin", "behavior driven", "acceptance"] },
  { id: "formik", name: "Formik", href: "https://formik.org/", category: "frontend", keywords: ["forms", "validation", "react", "state management"] },
  { id: "vault", name: "Vault", href: "https://www.vaultproject.io/", category: "devops", keywords: ["secrets", "credentials", "security", "hashicorp", "encryption"] },
  { id: "dbeaver", name: "DBeaver", href: "https://dbeaver.io/", category: "tools", keywords: ["database", "sql", "gui", "postgres", "mysql", "client"] },
  { id: "apps-script", name: "Google Apps Script", href: "https://script.google.com/", category: "tools", keywords: ["google", "automation", "sheets", "javascript", "workspace"] },
  { id: "strapi", name: "Strapi", href: "https://strapi.io/", category: "backend", keywords: ["cms", "headless", "api", "content", "node"] },
  { id: "vmware", name: "VMware ESXi", href: "https://www.vmware.com/", category: "cloud", keywords: ["virtualization", "hypervisor", "vm", "infrastructure", "enterprise"] },
];
