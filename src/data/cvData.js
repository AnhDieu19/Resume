const cvData = {
  en: {
    name: "DUONG BA DIEU (Jason)",
    title: "Senior Business Data Analyst",
    location: "Thu Duc City, Ho Chi Minh City, Vietnam",
    phone: "(+84) 916 273 889",
    email: "duongbadieu@gmail.com",
    linkedin: "https://linkedin.com/in/duong-ba-dieu-8128286b",

    summary:
      "Senior-level Business Data Analyst with a strong technical background and over 3 years of experience delivering customer data and revenue analytics across retail chains and healthcare clinics. Strengths include CRM/CDP requirements, API integrations, and BI analytics focusing on sales pipelines, revenue growth, and customer retention.",

    kpis: [
      { value: "4+", label: "Years BA Experience", icon: "Calendar" },
      { value: "3+", label: "Domains Covered", icon: "Layers" },
      { value: "7yr", label: "Data Migrated (ETL)", icon: "Database" },
      { value: "10+", label: "Systems Integrated", icon: "Plug" },
    ],

    skills: [
      { name: "Data & BI", value: 92, sub: "Power BI, DAX, Power Query, KPI Frameworks" },
      { name: "CRM/CDP Analysis", value: 90, sub: "Lead lifecycle, Customer 360, Segmentation" },
      { name: "Integration & API", value: 88, sub: "REST API, JSON, Power Automate, Webhooks" },
      { name: "SQL & Python", value: 86, sub: "MS SQL, MySQL, PostgreSQL, pandas" },
      { name: "Data Quality & MDM", value: 85, sub: "Dedup, Validation, Lineage, Reconciliation" },
      { name: "Collaboration", value: 82, sub: "Stakeholders, Vendors, QA, Cross-functional" },
    ],

    toolGroups: [
      { category: "CRM & Messaging", tools: ["Pancake", "Saleworks", "Zalo OA/ZNS", "3CX", "Stringee", "SMS Gateway"] },
      { category: "BI & Analytics", tools: ["Power BI", "Power Query", "DAX", "Power Pivot", "Superset"] },
      { category: "Databases", tools: ["MS SQL Server", "MySQL", "PostgreSQL"] },
      { category: "Programming", tools: ["Python", "SQL", "DAX", "Git"] },
      { category: "Integration", tools: ["REST APIs", "JSON", "Power Automate", "Webhooks"] },
      { category: "Documentation", tools: ["BPMN", "SRS", "RTM", "User Stories"] },
      { category: "Platforms", tools: ["HIS", "MISA AMIS", "Meta Ads", "Google Ads", "TikTok Ads"] },
    ],

    projects: [
      {
        title: "CRM Implementation & Customer 360",
        company: "Linh Anh Clinic Chain",
        scope: "10 branches",
        role: "Senior Business Analyst",
        challenge: "Disparate spreadsheets and standalone tools creating duplicate customer records and inconsistent sales/marketing processes.",
        actions: [
          "Conducted discovery workshops, authored SRS & BPMN diagrams, managed backlog via user stories",
          "Integrated external systems (3CX, MISA AMIS, SMS, Zalo ZNS) via REST APIs",
          "Normalized data schema and migrated 7 years of historical records using SQL ETL",
          "Built interactive Power BI dashboards for sales pipeline, revenue & conversion tracking",
        ],
        impact: "Centralized CRM across all branches, unified customer profiles, enabling faster campaign execution.",
        metrics: ["7yr data migrated", "10 branches unified", "REST API integrations"],
      },
      {
        title: "Marketing/Sales Data Integration & Reporting",
        company: "Siam Thailand Hospital",
        role: "Technical BA (Data/Integration)",
        challenge: "Fragmented data across CRM, HIS, EMR, call center, and ad platforms delaying decisions.",
        actions: [
          "Authored API specs and entity mappings; built ingestion pipelines via Power Automate & Python",
          "Standardized master data across systems; implemented Power BI semantic model with DAX",
          "Monitored commercial performance across product categories, channels & regions",
          "Analyzed marketing spend vs revenue outcomes for budget optimization",
        ],
        impact: "Established single source of truth for patient/customer journey with near-real-time dashboards.",
        metrics: ["Single source of truth", "ROI analysis", "Channel KPI tracking"],
      },
      {
        title: "EMR & E-Signature Implementation",
        company: "Siam Thailand Hospital",
        role: "Technical BA / Project Coordinator",
        challenge: "Paper-based forms and wet signatures causing inefficiencies and compliance risks.",
        actions: [
          "Planned infrastructure upgrades (network & hardware) for EMR system",
          "Led deployment and integration of digital e-signature workflows with vendors",
          "Facilitated UAT with doctors, nurses, and admin staff",
          "Digitized paper forms into e-forms ensuring regulatory compliance",
        ],
        impact: "Launched hospital's first EMR system, eliminating paper-based processes with high staff adoption.",
        metrics: ["First EMR system", "Paper-free workflows", "High adoption rate"],
      },
      {
        title: "Category Performance Optimization",
        company: "AEON Mall Canary",
        role: "Department Leader (Data-Driven Ops)",
        challenge: "3,000+ SKU portfolio with shrinkage risks and complex supply chain planning.",
        actions: [
          "Analyzed ERP data using Power Query/Pivot and Excel Solver",
          "Implemented improved stock control and loss prevention measures",
          "Coordinated with DC and 100+ suppliers on lead times and fill rates",
        ],
        impact: "Maintained shrinkage at ≤ 0.55% of sales, improved on-shelf availability.",
        metrics: ["≤ 0.55% shrinkage", "3,000+ SKUs", "100+ suppliers"],
      },
    ],

    experience: [
      {
        company: "FPT Center of Applied Data Science (CADS DC5)",
        role: "Business Analyst",
        period: "Nov 2025 – Present",
        type: "Full-time",
        location: "Ho Chi Minh City · On-site",
        domain: "platform",
        bullets: [
          "Customers Experience Platform development and analytics",
          "Retail Analysis for Long Chau / FShop use cases",
          "Customers Data Platform (CDP) for Retail and Healthcare domains",
        ],
        tags: ["CDP", "Retail Analytics", "CX Platform", "Healthcare"],
      },
      {
        company: "Siam Thailand Hospital",
        role: "Business Data Analyst",
        period: "Jul 2024 – Oct 2025",
        type: "Full-time",
        domain: "healthcare",
        bullets: [
          "Coordinated end-to-end EMR system implementation with integrated e-signature",
          "Built integrated reporting for Sales, Marketing & Finance; authored API documentation",
          "Developed automated data ingestion pipelines using Power Automate & Python",
          "Designed data models using DAX, SQL (MySQL, MS SQL), SSAS & Power BI Service",
          "Facilitated stakeholder workshops, SRS documentation and BPMN flows",
        ],
        tags: ["Power BI", "DAX", "Python", "REST API", "EMR", "SSAS"],
      },
      {
        company: "Linh Anh Cosmetic & Plastic Surgery Clinic",
        role: "Senior Business Analyst",
        period: "Jul 2022 – Jul 2024",
        type: "Full-time",
        domain: "retail",
        bullets: [
          "Led end-to-end CRM rollout for Marketing, Sales & Operations teams",
          "Integrated 3CX, MISA AMIS, SMS gateway, Zalo ZNS via REST APIs",
          "Mentored team of 4 BA interns on requirements gathering & testing",
          "Developed Power BI dashboards for revenue, pipeline & transaction metrics",
          "Migrated 7 years of historical data with SQL ETL & schema normalization",
        ],
        tags: ["CRM", "SQL", "Power BI", "REST API", "Zalo ZNS", "ETL"],
      },
      {
        company: "AEON Mall Canary (Binh Duong)",
        role: "Department Leader",
        period: "Dec 2019 – Nov 2021",
        type: "Full-time",
        domain: "retail",
        bullets: [
          "Managed multi-category retail ops: ~3,000 SKUs, 100+ suppliers",
          "Coordinated DC lead times, fill rates & supplier trade marketing",
          "Maintained shrinkage ≤ 0.55% via ERP analytics & loss prevention",
        ],
        tags: ["ERP", "Power Query", "Retail Ops", "Inventory"],
      },
      {
        company: "Central Retail (Big C Dong Nai)",
        role: "Bakery Department Manager",
        period: "2017 – Dec 2019",
        type: "Full-time",
        domain: "retail",
        bullets: [
          "Led 'Innovation Bakery' project: customer research, competitor analysis, NPD",
          "Authored CAPEX proposals; optimized production using PDCA cycles",
        ],
        tags: ["PDCA", "NPD", "Operations"],
      },
      {
        company: "InterContinental Danang Sun Peninsula Resort",
        role: "Events Coordinator Trainee",
        period: "Mar 2016 – Jun 2016",
        type: "Internship",
        domain: "hospitality",
        bullets: [
          "Supported MICE & wedding event logistics; liaised with suppliers & VIP clients",
        ],
        tags: ["MICE", "B2B"],
      },
      {
        company: "Furama Danang Resort (Sovico Holdings)",
        role: "HR Trainee",
        period: "Dec 2015 – Mar 2016",
        type: "Internship",
        domain: "hospitality",
        bullets: [
          "HR rotation: recruitment, onboarding, payroll system administration",
          "F&B operations: customer inquiries, resort tours, event support",
        ],
        tags: ["HR", "F&B"],
      },
    ],

    education: [
      { degree: "Bachelor of Business Administration (BBA)", institution: "University of Economics, Danang", year: "2012 – 2016", note: "GPA 3.0/4.0" },
      { degree: "Future Manager Program", institution: "Central Retail & Asian Institute of Technology", year: "2016 – 2017", note: "" },
      { degree: "Business Analysis Foundation", institution: "Hai Lua Institute", year: "2022", note: "Capstone: Document Management System" },
      { degree: "Web Development Program", institution: "Funix (FPT)", year: "2021 – 2022", note: "JavaScript, HTML/CSS, Node.js, MS SQL" },
    ],

    certifications: [
      { name: "Digital Transformation – BA & Information Systems", issuer: "Coursera" },
      { name: "Product Analytics Micro-Certification (PAC), Level 2", issuer: "PAC" },
      { name: "ICPM Certified Supervisor; Building High Performing Teams", issuer: "ICPM" },
      { name: "Power BI for Data Analytics", issuer: "RMIT University" },
      { name: "Omnichannel Retail", issuer: "RMIT University" },
      { name: "Salesforce Operations", issuer: "Salesforce" },
    ],

    languages: [
      { name: "English", level: "TOEIC 790 (2016) – Fluent business communication", percent: 79 },
      { name: "Vietnamese", level: "Native", percent: 100 },
    ],
  },

  vi: {
    name: "DƯƠNG BÁ DIỆU (Jason)",
    title: "Chuyên viên Phân tích Dữ liệu Kinh doanh",
    location: "TP. Thủ Đức, TP. Hồ Chí Minh, Việt Nam",
    phone: "(+84) 916 273 889",
    email: "duongbadieu@gmail.com",
    linkedin: "https://linkedin.com/in/duong-ba-dieu-8128286b",

    summary:
      "Chuyên viên Phân tích Dữ liệu Kinh doanh cấp cao với nền tảng kỹ thuật vững chắc, hơn 3 năm kinh nghiệm phân tích dữ liệu khách hàng và doanh thu cho chuỗi bán lẻ và phòng khám. Thế mạnh: CRM/CDP, tích hợp API, và phân tích BI tập trung vào pipeline bán hàng, tăng trưởng doanh thu và giữ chân khách hàng.",

    kpis: [
      { value: "4+", label: "Năm kinh nghiệm BA", icon: "Calendar" },
      { value: "3+", label: "Lĩnh vực", icon: "Layers" },
      { value: "7 năm", label: "Dữ liệu đã di chuyển", icon: "Database" },
      { value: "10+", label: "Hệ thống đã tích hợp", icon: "Plug" },
    ],

    skills: [
      { name: "Dữ liệu & BI", value: 92, sub: "Power BI, DAX, Power Query, KPI Frameworks" },
      { name: "Phân tích CRM/CDP", value: 90, sub: "Vòng đời leads, Customer 360, Phân khúc" },
      { name: "Tích hợp & API", value: 88, sub: "REST API, JSON, Power Automate, Webhooks" },
      { name: "SQL & Python", value: 86, sub: "MS SQL, MySQL, PostgreSQL, pandas" },
      { name: "Chất lượng dữ liệu", value: 85, sub: "Loại trùng, Validation, Lineage" },
      { name: "Phối hợp", value: 82, sub: "Stakeholders, Vendors, QA, Đa chức năng" },
    ],

    toolGroups: [
      { category: "CRM & Nhắn tin", tools: ["Pancake", "Saleworks", "Zalo OA/ZNS", "3CX", "Stringee", "SMS Gateway"] },
      { category: "BI & Phân tích", tools: ["Power BI", "Power Query", "DAX", "Power Pivot", "Superset"] },
      { category: "Cơ sở dữ liệu", tools: ["MS SQL Server", "MySQL", "PostgreSQL"] },
      { category: "Lập trình", tools: ["Python", "SQL", "DAX", "Git"] },
      { category: "Tích hợp", tools: ["REST APIs", "JSON", "Power Automate", "Webhooks"] },
      { category: "Tài liệu", tools: ["BPMN", "SRS", "RTM", "User Stories"] },
      { category: "Nền tảng", tools: ["HIS", "MISA AMIS", "Meta Ads", "Google Ads", "TikTok Ads"] },
    ],

    projects: [
      {
        title: "Triển khai CRM & Customer 360",
        company: "Chuỗi phòng khám Linh Anh",
        scope: "10 chi nhánh",
        role: "Senior Business Analyst",
        challenge: "Dữ liệu phân tán trên spreadsheets, hồ sơ khách hàng trùng lặp và quy trình bán hàng/marketing không nhất quán.",
        actions: [
          "Tổ chức workshop khảo sát, viết SRS & sơ đồ BPMN, quản lý backlog qua user stories",
          "Tích hợp hệ thống bên ngoài (3CX, MISA AMIS, SMS, Zalo ZNS) qua REST APIs",
          "Chuẩn hóa schema dữ liệu và di chuyển 7 năm dữ liệu lịch sử bằng SQL ETL",
          "Xây dựng dashboard Power BI cho pipeline bán hàng, doanh thu & tỷ lệ chuyển đổi",
        ],
        impact: "Tập trung CRM cho toàn bộ chi nhánh, hợp nhất hồ sơ khách hàng, tăng tốc chiến dịch.",
        metrics: ["7 năm dữ liệu", "10 chi nhánh", "Tích hợp REST API"],
      },
      {
        title: "Tích hợp dữ liệu Marketing/Sales & Báo cáo",
        company: "Bệnh viện Siam Thailand",
        role: "Technical BA (Data/Integration)",
        challenge: "Dữ liệu phân mảnh giữa CRM, HIS, EMR, tổng đài và nền tảng quảng cáo làm chậm ra quyết định.",
        actions: [
          "Viết đặc tả API và ánh xạ thực thể; xây pipeline nhập dữ liệu qua Power Automate & Python",
          "Chuẩn hóa master data; triển khai mô hình ngữ nghĩa Power BI với DAX",
          "Giám sát hiệu suất kinh doanh theo danh mục, kênh & khu vực",
          "Phân tích chi phí marketing so với doanh thu để tối ưu ngân sách",
        ],
        impact: "Thiết lập nguồn dữ liệu duy nhất cho hành trình bệnh nhân/khách hàng với dashboard gần thời gian thực.",
        metrics: ["Nguồn dữ liệu duy nhất", "Phân tích ROI", "KPI theo kênh"],
      },
      {
        title: "Triển khai EMR & Chữ ký điện tử",
        company: "Bệnh viện Siam Thailand",
        role: "Technical BA / Điều phối dự án",
        challenge: "Biểu mẫu giấy và chữ ký tay gây thiếu hiệu quả và rủi ro tuân thủ.",
        actions: [
          "Lập kế hoạch nâng cấp hạ tầng (mạng & phần cứng) cho hệ thống EMR",
          "Chỉ đạo triển khai và tích hợp quy trình chữ ký số với nhà cung cấp",
          "Tổ chức UAT với bác sĩ, điều dưỡng và nhân viên hành chính",
          "Số hóa biểu mẫu giấy đảm bảo tuân thủ quy định",
        ],
        impact: "Ra mắt hệ thống EMR đầu tiên, loại bỏ quy trình giấy với tỷ lệ áp dụng cao.",
        metrics: ["EMR đầu tiên", "Không giấy tờ", "Tỷ lệ áp dụng cao"],
      },
      {
        title: "Tối ưu hiệu suất danh mục",
        company: "AEON Mall Canary",
        role: "Trưởng bộ phận (Vận hành dựa trên dữ liệu)",
        challenge: "Danh mục 3,000+ SKU với rủi ro hao hụt và chuỗi cung ứng phức tạp.",
        actions: [
          "Phân tích dữ liệu ERP bằng Power Query/Pivot và Excel Solver",
          "Triển khai quy trình kiểm soát tồn kho và phòng chống thất thoát",
          "Phối hợp với trung tâm phân phối và 100+ nhà cung cấp",
        ],
        impact: "Duy trì hao hụt ≤ 0.55% doanh thu, cải thiện tính sẵn sàng hàng hóa.",
        metrics: ["≤ 0.55% hao hụt", "3,000+ SKUs", "100+ NCC"],
      },
    ],

    experience: [
      {
        company: "FPT Center of Applied Data Science (CADS DC5)",
        role: "Business Analyst",
        period: "11/2025 – Hiện tại",
        type: "Toàn thời gian",
        location: "TP.HCM · Onsite",
        domain: "platform",
        bullets: [
          "Phát triển nền tảng Trải nghiệm Khách hàng (CX Platform)",
          "Phân tích bán lẻ cho Long Châu / FShop",
          "Nền tảng Dữ liệu Khách hàng (CDP) cho Bán lẻ và Y tế",
        ],
        tags: ["CDP", "Retail Analytics", "CX Platform", "Healthcare"],
      },
      {
        company: "Bệnh viện Siam Thailand",
        role: "Chuyên viên Phân tích Dữ liệu Kinh doanh",
        period: "07/2024 – 10/2025",
        type: "Toàn thời gian",
        domain: "healthcare",
        bullets: [
          "Điều phối triển khai hệ thống EMR tích hợp chữ ký điện tử",
          "Xây dựng báo cáo tích hợp cho Sales, Marketing & Finance",
          "Phát triển pipeline nhập dữ liệu tự động bằng Power Automate & Python",
          "Thiết kế mô hình dữ liệu bằng DAX, SQL, SSAS & Power BI Service",
        ],
        tags: ["Power BI", "DAX", "Python", "REST API", "EMR", "SSAS"],
      },
      {
        company: "Phòng khám Linh Anh",
        role: "Senior Business Analyst",
        period: "07/2022 – 07/2024",
        type: "Toàn thời gian",
        domain: "retail",
        bullets: [
          "Chủ trì triển khai CRM cho Marketing, Sales & Operations",
          "Tích hợp 3CX, MISA AMIS, SMS, Zalo ZNS qua REST APIs",
          "Hướng dẫn 4 thực tập sinh BA về thu thập yêu cầu & kiểm thử",
          "Xây dựng dashboard Power BI cho doanh thu, pipeline & giao dịch",
          "Di chuyển 7 năm dữ liệu lịch sử bằng SQL ETL & chuẩn hóa schema",
        ],
        tags: ["CRM", "SQL", "Power BI", "REST API", "Zalo ZNS", "ETL"],
      },
      {
        company: "AEON Mall Canary (Bình Dương)",
        role: "Trưởng Bộ phận",
        period: "12/2019 – 11/2021",
        type: "Toàn thời gian",
        domain: "retail",
        bullets: [
          "Quản lý vận hành bán lẻ đa danh mục: ~3,000 SKUs, 100+ NCC",
          "Phối hợp thời gian giao hàng, tỷ lệ đáp ứng & trade marketing",
          "Duy trì hao hụt ≤ 0.55% qua phân tích ERP & phòng chống thất thoát",
        ],
        tags: ["ERP", "Power Query", "Retail Ops", "Inventory"],
      },
      {
        company: "Central Retail (Big C Đồng Nai)",
        role: "Quản lý Bộ phận Bakery",
        period: "2017 – 12/2019",
        type: "Toàn thời gian",
        domain: "retail",
        bullets: [
          "Chủ trì dự án 'Innovation Bakery': nghiên cứu KH, phân tích đối thủ, NPD",
          "Viết đề xuất đầu tư CAPEX; tối ưu sản xuất theo chu trình PDCA",
        ],
        tags: ["PDCA", "NPD", "Operations"],
      },
      {
        company: "InterContinental Danang Sun Peninsula Resort",
        role: "Thực tập sinh Điều phối Sự kiện",
        period: "03/2016 – 06/2016",
        type: "Thực tập",
        domain: "hospitality",
        bullets: [
          "Hỗ trợ sự kiện MICE & tiệc cưới; liên hệ NCC & khách VIP",
        ],
        tags: ["MICE", "B2B"],
      },
      {
        company: "Furama Danang Resort (Sovico Holdings)",
        role: "Thực tập sinh Nhân sự",
        period: "12/2015 – 03/2016",
        type: "Thực tập",
        domain: "hospitality",
        bullets: [
          "Luân chuyển HR: tuyển dụng, onboarding, quản trị hệ thống lương",
          "Vận hành F&B: xử lý yêu cầu KH, hướng dẫn tham quan, hỗ trợ sự kiện",
        ],
        tags: ["HR", "F&B"],
      },
    ],

    education: [
      { degree: "Cử nhân Quản trị Kinh doanh (BBA)", institution: "Đại học Kinh tế Đà Nẵng", year: "2012 – 2016", note: "GPA 3.0/4.0" },
      { degree: "Chương trình Future Manager", institution: "Central Retail & AIT", year: "2016 – 2017", note: "" },
      { degree: "Nền tảng Phân tích Kinh doanh", institution: "Viện Hai Lua", year: "2022", note: "Đồ án: Hệ thống Quản lý Tài liệu" },
      { degree: "Chương trình Phát triển Web", institution: "Funix (FPT)", year: "2021 – 2022", note: "JavaScript, HTML/CSS, Node.js, MS SQL" },
    ],

    certifications: [
      { name: "Chuyển đổi số – BA & Hệ thống Thông tin", issuer: "Coursera" },
      { name: "Product Analytics Micro-Certification (PAC), Level 2", issuer: "PAC" },
      { name: "ICPM Certified Supervisor; Building High Performing Teams", issuer: "ICPM" },
      { name: "Power BI for Data Analytics", issuer: "RMIT University" },
      { name: "Omnichannel Retail", issuer: "RMIT University" },
      { name: "Salesforce Operations", issuer: "Salesforce" },
    ],

    languages: [
      { name: "Tiếng Anh", level: "TOEIC 790 (2016) – Giao tiếp kinh doanh", percent: 79 },
      { name: "Tiếng Việt", level: "Bản ngữ", percent: 100 },
    ],
  },
};

export default cvData;
