export const blockCategories = [
  { id: "application", label: "Application" },
  { id: "authentication", label: "Authentication" },
  { id: "dashboards", label: "Dashboards" },
  { id: "data", label: "Data display" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "feedback", label: "Feedback" },
  { id: "marketing", label: "Marketing" },
  { id: "settings", label: "Settings" },
] as const

export type BlockCategory = (typeof blockCategories)[number]["id"]

export type Block = {
  category: BlockCategory
  description: string
  name: string
  slug: string
}

export const blocks: Block[] = [
  {
    category: "settings",
    description:
      "Profile, password and preference forms split over tabs, with a danger zone at the end.",
    name: "Account settings",
    slug: "account-settings",
  },
  {
    category: "dashboards",
    description:
      "Key metrics, a bar chart, top pages and traffic sources for a selectable date range.",
    name: "Analytics dashboard",
    slug: "analytics-dashboard",
  },
  {
    category: "application",
    description:
      "A header, a navigation sidebar that turns into a drawer on small screens, and a main area.",
    name: "App shell",
    slug: "app-shell",
  },
  {
    category: "settings",
    description:
      "The current plan, usage against its limits, the payment method and past invoices.",
    name: "Billing",
    slug: "billing",
  },
  {
    category: "marketing",
    description:
      "A featured post followed by a grid of post cards with tags, authors and reading time.",
    name: "Blog list",
    slug: "blog-list",
  },
  {
    category: "marketing",
    description:
      "Releases on a timeline, each with a version, a date and grouped changes.",
    name: "Changelog",
    slug: "changelog",
  },
  {
    category: "application",
    description:
      "Conversations next to a message thread with a composer at the bottom.",
    name: "Chat",
    slug: "chat",
  },
  {
    category: "e-commerce",
    description:
      "Contact, shipping and payment details next to an order summary.",
    name: "Checkout",
    slug: "checkout",
  },
  {
    category: "data",
    description:
      "A searchable, filterable table with row selection, statuses, row actions and pagination.",
    name: "Data table",
    slug: "data-table",
  },
  {
    category: "feedback",
    description:
      "Empty states for a first run, an empty search, a cleared inbox and a missing permission.",
    name: "Empty states",
    slug: "empty-states",
  },
  {
    category: "feedback",
    description:
      "A not found page with a search field and links to get back on track.",
    name: "Error page",
    slug: "error-page",
  },
  {
    category: "marketing",
    description:
      "Frequently asked questions in an accordion group, with a way to reach support.",
    name: "FAQ",
    slug: "faq",
  },
  {
    category: "marketing",
    description:
      "A grid of features, each with an icon, a title and a summary.",
    name: "Feature grid",
    slug: "feature-grid",
  },
  {
    category: "application",
    description:
      "Storage usage, folders and a file table with sorting and row actions.",
    name: "File manager",
    slug: "file-manager",
  },
  {
    category: "authentication",
    description:
      "An email field to request a reset link, and the message shown after sending it.",
    name: "Forgot password",
    slug: "forgot-password",
  },
  {
    category: "marketing",
    description:
      "A headline, a short pitch, two calls to action and a product preview.",
    name: "Hero",
    slug: "hero",
  },
  {
    category: "application",
    description:
      "Folders, a message list with unread states and a reading pane.",
    name: "Inbox",
    slug: "inbox",
  },
  {
    category: "data",
    description:
      "Sender and recipient, line items, totals and payment details for an invoice.",
    name: "Invoice",
    slug: "invoice",
  },
  {
    category: "application",
    description:
      "Columns of task cards with labels, assignees, due dates and counts.",
    name: "Kanban board",
    slug: "kanban-board",
  },
  {
    category: "marketing",
    description:
      "A newsletter sign-up with an email field, topic choices and a privacy note.",
    name: "Newsletter",
    slug: "newsletter",
  },
  {
    category: "settings",
    description:
      "A table of switches that sets which notifications go to email, push and SMS.",
    name: "Notification settings",
    slug: "notification-settings",
  },
  {
    category: "data",
    description:
      "Notifications grouped by day, with tabs, unread markers and inline actions.",
    name: "Notifications",
    slug: "notifications",
  },
  {
    category: "feedback",
    description:
      "A getting started checklist with progress and a call to action per step.",
    name: "Onboarding checklist",
    slug: "onboarding-checklist",
  },
  {
    category: "e-commerce",
    description:
      "Past orders with their status, items, totals and actions to track or reorder.",
    name: "Order history",
    slug: "order-history",
  },
  {
    category: "marketing",
    description:
      "Three plans with a monthly or yearly toggle, a highlighted plan and a feature comparison.",
    name: "Pricing",
    slug: "pricing",
  },
  {
    category: "e-commerce",
    description:
      "A product gallery, color and size choices, quantity, add to cart and details.",
    name: "Product detail",
    slug: "product-detail",
  },
  {
    category: "dashboards",
    description:
      "Milestones, progress, the team and recent activity for a single project.",
    name: "Project overview",
    slug: "project-overview",
  },
  {
    category: "dashboards",
    description:
      "Revenue, orders and conversion with sales targets and the latest orders.",
    name: "Sales dashboard",
    slug: "sales-dashboard",
  },
  {
    category: "dashboards",
    description:
      "Service health, uptime history, response times and incidents.",
    name: "Server status",
    slug: "server-status",
  },
  {
    category: "e-commerce",
    description:
      "Cart items with quantity controls, a discount code and an order summary.",
    name: "Shopping cart",
    slug: "shopping-cart",
  },
  {
    category: "authentication",
    description:
      "An email and password form with a remember me option and social sign-in.",
    name: "Sign in",
    slug: "sign-in",
  },
  {
    category: "authentication",
    description:
      "An account form with a password hint, a plan choice and terms.",
    name: "Sign up",
    slug: "sign-up",
  },
  {
    category: "settings",
    description:
      "An invite form and a member list with roles, statuses and actions.",
    name: "Team members",
    slug: "team-members",
  },
  {
    category: "marketing",
    description: "Customer quotes with names, roles and ratings.",
    name: "Testimonials",
    slug: "testimonials",
  },
  {
    category: "authentication",
    description:
      "A one-time code form for two-factor authentication, with a way to resend the code.",
    name: "Two-factor authentication",
    slug: "two-factor",
  },
  {
    category: "data",
    description:
      "A filterable grid of people cards with avatars, roles and contact actions.",
    name: "User directory",
    slug: "user-directory",
  },
]
