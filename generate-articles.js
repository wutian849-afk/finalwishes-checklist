const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://wutian849-afk.github.io/finalwishes-checklist';

const articles = [
  // Funeral & After Death
  {title:'What to Do When Someone Dies at Home', slug:'what-to-do-when-someone-dies-at-home', cat:'After Death', keywords:'death at home, what to do when someone dies, first steps after death, who to call when someone dies'},
  {title:'What to Do When Someone Dies in the Hospital', slug:'what-to-do-when-someone-dies-in-hospital', cat:'After Death', keywords:'hospital death, what to do when someone dies in hospital, hospital death procedures, calling funeral home from hospital'},
  {title:'What to Do When Someone Dies Suddenly', slug:'what-to-do-when-someone-dies-suddenly', cat:'After Death', keywords:'unexpected death, sudden death checklist, what to do after unexpected death, coroner investigation death'},
  {title:'What to Do When Someone Dies Abroad', slug:'what-to-do-when-someone-dies-abroad', cat:'After Death', keywords:'death abroad, repatriation of remains, international death procedures, US citizen dies in foreign country, embassy death assistance'},
  {title:'How to Write an Obituary', slug:'how-to-write-an-obituary', cat:'Funeral', keywords:'obituary writing tips, obituary template, how to write an obituary, obituary examples, obituary cost newspaper'},
  {title:'How to Plan a Funeral Step by Step', slug:'how-to-plan-a-funeral-step-by-step', cat:'Funeral', keywords:'funeral planning guide, how to plan a funeral, funeral steps, funeral arrangement checklist, first steps funeral planning'},
  {title:'Funeral Cost Comparison Checklist', slug:'funeral-cost-comparison-checklist', cat:'Funeral', keywords:'funeral costs, funeral pricing comparison, average funeral cost, funeral home quotes comparison, how to save on funeral costs'},
  {title:'How to Choose a Funeral Home', slug:'how-to-choose-a-funeral-home', cat:'Funeral', keywords:'choosing funeral home, funeral home checklist, what to ask funeral home, funeral home pricing transparency'},
  {title:'Cremation vs Burial Comparison', slug:'cremation-vs-burial-comparison', cat:'Funeral', keywords:'cremation vs burial, burial vs cremation pros cons, average cremation cost, traditional burial cost, green burial options'},
  {title:'How to Write a Eulogy', slug:'how-to-write-a-eulogy', cat:'Funeral', keywords:'eulogy writing guide, how to write a eulogy, eulogy template, eulogy examples, funeral speech, tips for writing eulogy'},
  {title:'What to Say at a Funeral (Guest Guide)', slug:'what-to-say-at-a-funeral', cat:'Funeral', keywords:'what to say at funeral, funeral etiquette words, sympathy words, funeral guest guide'},
  {title:'Funeral Etiquette Guide', slug:'funeral-etiquette-guide', cat:'Funeral', keywords:'funeral etiquette, funeral behavior, funeral dress code, funeral rules, what to wear to funeral, funeral flowers rules'},
  {title:'What to Wear to a Funeral', slug:'what-to-wear-to-a-funeral', cat:'Funeral', keywords:'funeral attire, what to wear to a funeral, funeral dress code men, funeral dress code women, appropriate funeral clothing'},
  {title:'How to Notify Family of a Death', slug:'how-to-notify-family-of-death', cat:'After Death', keywords:'notifying family of death, death notification checklist, who to call when someone dies, death announcement to family'},
  {title:'How to Notify Social Security of a Death', slug:'notify-social-security-of-death', cat:'After Death', keywords:'notify social security of death, social security death benefit, SSA death notification, stop social security payments after death'},

  // Estate & Legal
  {title:'Probate Process Explained Step by Step', slug:'probate-process-step-by-step', cat:'Estate', keywords:'probate process, probate timeline, what is probate, probate explained, how long does probate take, probate costs'},
  {title:'What Is an Executor (Duties Explained)', slug:'what-is-an-executor-duties', cat:'Estate', keywords:'executor duties, what does an executor do, estate executor responsibilities, executor checklist, executor compensation'},
  {title:'Executor Fees and Compensation', slug:'executor-fees-compensation', cat:'Estate', keywords:'executor fees, executor compensation, how much does executor get paid, executor hourly rate, executor percentage'},
  {title:'How to Find a Will After Death', slug:'how-to-find-a-will-after-death', cat:'Estate', keywords:'finding a will, how to find a will, will search, where to find a will after death, lost will, will safekeeping'},
  {title:'What Happens If Someone Dies Without a Will', slug:'dies-without-a-will-intestate', cat:'Estate', keywords:'intestate, dying without a will, what happens without a will, intestate succession, who inherits without a will'},
  {title:'How to Close Bank Accounts After Death', slug:'close-bank-accounts-after-death', cat:'Estate', keywords:'close bank account after death, bank accounts deceased person, what happens to bank accounts when someone dies'},
  {title:'How to Cancel Credit Cards of Deceased', slug:'cancel-credit-cards-deceased', cat:'Estate', keywords:'cancel credit cards after death, credit card debt when someone dies, notify credit bureaus of death'},
  {title:'How to Transfer Car Title After Death', slug:'transfer-car-title-after-death', cat:'Estate', keywords:'transfer car title death, vehicle ownership transfer after death, DMV death transfer, inheritance vehicle deceased'},
  {title:'What Happens to Joint Bank Accounts When One Person Dies', slug:'joint-bank-account-death', cat:'Estate', keywords:'joint bank account death, right of survivorship bank account, joint account when one dies, what happens to joint account after death'},
  {title:'How to File Life Insurance Claim', slug:'file-life-insurance-claim', cat:'Estate', keywords:'life insurance claim, filing life insurance claim, life insurance payout process, beneficiaries death claim, claim death benefit'},
  {title:'What Debts Are Forgiven at Death', slug:'debts-forgiven-at-death', cat:'Estate', keywords:'debts after death, debt forgiveness death, what debts are forgiven when you die, estate debt, medical debt after death'},

  // Digital Legacy
  {title:'Digital Legacy Planning Guide', slug:'digital-legacy-planning-guide', cat:'Digital', keywords:'digital legacy, digital estate planning, what happens to online accounts after death, digital death, online legacy planning'},
  {title:'What Happens to Social Media When You Die', slug:'social-media-when-you-die', cat:'Digital', keywords:'facebook memorialize account, instagram memorial account, twitter death policy, social media after death, social media legacy'},
  {title:'How to Leave Bitcoin and Crypto to Heirs', slug:'leave-bitcoin-crypto-to-heirs', cat:'Digital', keywords:'cryptocurrency inheritance, bitcoin inheritance planning, crypto estate planning, leaving crypto to beneficiaries, digital asset will'},
  {title:'How to Leave Passwords in Your Will', slug:'leave-passwords-in-will', cat:'Digital', keywords:'password inheritance, digital password will, password manager estate, leaving passwords in will, legacy password list'},
  {title:'What Happens to Email Accounts After Death', slug:'email-accounts-after-death', cat:'Digital', keywords:'gmail death policy, deceased email account, access email after death, email legacy, email executor access'},

  // Medical & End-of-Life
  {title:'What Is a Living Will (Advance Directive)', slug:'what-is-a-living-will', cat:'Medical', keywords:'living will, advance directive, what is a living will, living will vs last will, healthcare directive, end of life wishes'},
  {title:'What Is a Do Not Resuscitate Order (DNR)', slug:'what-is-dnr-do-not-resuscitate', cat:'Medical', keywords:'DNR, do not resuscitate, DNR order, what is DNR, DNR vs living will, DNR form, how to get a DNR order'},
  {title:'Medical Power of Attorney Guide', slug:'medical-power-of-attorney-guide', cat:'Medical', keywords:'medical power of attorney, healthcare proxy, healthcare POA, medical decision maker, who makes medical decisions if incapacitated'},
  {title:'Hospice Care vs Palliative Care', slug:'hospice-vs-palliative-care', cat:'Medical', keywords:'hospice vs palliative care, hospice care explained, palliative care explained, when to choose hospice, hospice eligibility'},
  {title:'Five Wishes Document Explained', slug:'five-wishes-document', cat:'Medical', keywords:'five wishes, five wishes document, five wishes advance directive, end of life wishes document, five wishes form'},

  // Preplanning & Organizing
  {title:'How to Preplan Your Funeral (Step by Step)', slug:'preplan-funeral-step-by-step', cat:'Preplanning', keywords:'preplanning funeral, prearranged funeral, funeral preplanning checklist, prepaid funeral, why preplan funeral'},
  {title:'Prepaid Funeral Plans Explained', slug:'prepaid-funeral-plans', cat:'Preplanning', keywords:'prepaid funeral, prepaid funeral plan, funeral insurance, burial insurance, prepaid funeral pros cons'},
  {title:'How to Organize Important Documents', slug:'organize-important-documents', cat:'Preplanning', keywords:'organize important documents, important documents binder, what documents to keep, document organizer for family, emergency document binder'},
  {title:'End-of-Life Planning Guide (Complete)', slug:'end-of-life-planning-guide', cat:'Preplanning', keywords:'end of life planning, comprehensive end of life plan, death planning checklist, get affairs in order, end of life to-do list'},
  {title:'The Last Wishes Conversation Starter', slug:'how-to-talk-to-parents-about-death', cat:'Preplanning', keywords:'talking to aging parents about death, end of life conversation, death conversation starter, talking about dying with parents, estate planning conversation'},

  // Grief & Emotional Support
  {title:'Stages of Grief Explained', slug:'stages-of-grief', cat:'Grief', keywords:'stages of grief, 5 stages of grief, grief explained, denial anger bargaining depression acceptance, Kubler-Ross grief cycle'},
  {title:'How to Help Someone Who Is Grieving', slug:'help-someone-grieving', cat:'Grief', keywords:'helping grieving person, how to help someone who lost a loved one, grief support, what to say to someone grieving'},
  {title:'Grief Support Resources', slug:'grief-support-resources', cat:'Grief', keywords:'grief support groups, grief counseling, bereavement support, grief hotline, loss of loved one support groups, grief resources online'},
  {title:'First Year After Losing a Spouse', slug:'first-year-after-losing-spouse', cat:'Grief', keywords:'losing a spouse, widowed first year, grief after spouse dies, losing husband, losing wife, moving on after spouse death'},
  {title:'How to Help Children Cope with Death', slug:'help-children-cope-with-death', cat:'Grief', keywords:'children grief, talking to children about death, helping child cope with death, child bereavement, how to tell child someone died'},
  {title:'The Empty Chair at Holidays', slug:'grief-during-holidays', cat:'Grief', keywords:'grief during holidays, missing loved one holidays, holidays after death, coping with grief holidays, traditions for deceased family member'},

  // Legal & Financial Documents
  {title:'Last Will and Testament Guide', slug:'last-will-and-testament-guide', cat:'Legal', keywords:'last will and testament, what is a will, how to write a will, will vs trust, simple will, what should a will include'},
  {title:'What Is a Revocable Living Trust', slug:'revocable-living-trust', cat:'Legal', keywords:'revocable living trust, living trust vs will, trust planning, what is a living trust, revocable trust explained, benefits of living trust'},
  {title:'Power of Attorney Types Explained', slug:'power-of-attorney-types', cat:'Legal', keywords:'power of attorney, POA, types of power of attorney, financial POA, medical POA, durable power of attorney, springing POA'},
  {title:'Nursing Home Medicaid Planning', slug:'nursing-home-medicaid-planning', cat:'Legal', keywords:'Medicaid planning, nursing home costs, Medicaid eligibility, asset protection Medicaid, Medicaid spend down, nursing home planning'},
  {title:'Estate Tax Guide (Federal and State)', slug:'estate-tax-guide', cat:'Legal', keywords:'estate tax, inheritance tax, federal estate tax exemption, state estate tax, estate tax planning, how much is estate tax 2026'},
];

// Templates for the actual article HTML
function generateArticleHTML(article) {
  const today = new Date().toISOString().split('T')[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${article.title} | FinalWishesChecklist</title>
<meta name="description" content="${article.title}. A compassionate step-by-step guide. Free checklist available for download.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_URL}/articles/${article.slug}.html">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DGKVNWKVDZ"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-DGKVNWKVDZ');</script>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:720px;margin:0 auto;padding:24px 20px 80px;color:#1e293b;line-height:1.7;font-size:15px;background:#faf8f5}
h1{font-size:28px;font-weight:700;margin-bottom:8px;line-height:1.2;color:#1e293b}
.meta{font-size:12px;color:#94a3b8;margin-bottom:24px}
h2{font-size:20px;font-weight:600;margin-top:36px;margin-bottom:10px;color:#334155;border-bottom:1px solid #e2e8f0;padding-bottom:6px}
h3{font-size:16px;font-weight:600;margin-top:24px;margin-bottom:8px;color:#475569}
p{margin-bottom:14px;color:#475569}
ul,ol{margin:0 0 14px 20px;color:#475569;font-size:14px;line-height:1.6}
li{margin-bottom:4px}
.cta-box{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin:28px 0;font-size:14px;text-align:center}
.cta-box strong{color:#92400e;display:block;margin-bottom:6px}
.cta-box a{display:inline-block;padding:10px 24px;background:#fbbf24;color:#1e293b;border-radius:8px;font-weight:600;text-decoration:none;margin-top:6px;font-size:13px}
.cta-box a:hover{background:#f59e0b}
.related-links{background:#f1f5f9;border-radius:8px;padding:12px 16px;font-size:13px;margin:20px 0}
.related-links a{color:#475569;text-decoration:none;display:block;padding:3px 0}
.related-links a:hover{color:#1e293b;text-decoration:underline}
.disclaimer{font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:16px;margin-top:32px}
</style>
</head>
<body>
<h1>${article.title}</h1>
<div class="meta">Category: ${article.cat} · Tags: ${article.keywords}</div>

<p><strong>${article.title}</strong> is one of life's most difficult moments. This guide walks you through everything you need to know, step by step.</p>

<div class="cta-box">
<strong>📋 Want the complete ${article.cat.toLowerCase()} checklist?</strong>
Get our full planning guide with 50+ action items in a downloadable PDF.
<a onclick="gtag('event','click_cta',{'event_category':'article','event_label':'${article.slug}'})" href="/finalwishes-checklist/index.html#products">Browse Checklists →</a>
</div>

<h2>Why This Matters</h2>
<p>Whether you are planning ahead for yourself or handling arrangements for a loved one, having a structured approach reduces stress, saves money, and ensures nothing is missed. The average funeral costs $7,000-$12,000 in the United States. Making decisions under emotional pressure often leads to overspending and overlooked details.</p>

<h2>Key Steps to Follow</h2>
<h3>1. Take a Deep Breath</h3>
<p>The first step is simply to pause and take stock. There is no need to do everything at once. Our checklists break down each area into manageable tasks that you can complete at your own pace.</p>

<h3>2. Gather Important Information</h3>
<p>Start collecting relevant documents, contact information, and preferences. If you're handling arrangements for someone else, check if they left any written instructions, a will, or preplanned funeral arrangements.</p>

<h3>3. Work Through Each Section</h3>
<p>Use our specialized checklists to systematically address each area:</p>
<ul>
<li>Immediate steps after a death</li>
<li>Funeral and memorial arrangements</li>
<li>Estate and legal processes</li>
<li>Financial accounts and insurance</li>
<li>Digital accounts and online presence</li>
<li>Notifications and documentation</li>
</ul>

<h3>4. Document Everything</h3>
<p>Keep written records of all decisions, receipts, and correspondence. This will be invaluable for estate administration, tax purposes, and family communication.</p>

<h3>5. Give Yourself Time</h3>
<p>Grief is not linear. Allow yourself and your family the time and space to process. Our checklists are designed to be worked through over days and weeks, not hours.</p>

<h2>Helpful Resources</h2>
<div class="related-links">
<strong>Related guides:</strong>
<a href="/finalwishes-checklist/articles/${article.slug}.html">${article.title}</a>
<a href="/finalwishes-checklist/articles/end-of-life-planning-guide.html">Complete End-of-Life Planning Guide</a>
<a href="/finalwishes-checklist/articles/how-to-plan-a-funeral-step-by-step.html">How to Plan a Funeral</a>
<a href="/finalwishes-checklist/articles/probate-process-step-by-step.html">Probate Process Explained</a>
<a href="/finalwishes-checklist/articles/digital-legacy-planning-guide.html">Digital Legacy Guide</a>
</div>

<h2>Get the Complete Checklist</h2>
<p>Our downloadable PDF checklists cover every detail with comprehensive checkboxes, space for notes, and expert guidance. No signup required — just download and start planning.</p>

<div class="cta-box">
<strong>📥 Download the ${article.cat} Checklist</strong>
Available in PDF format. Instant download. Print-friendly.
<a onclick="gtag('event','click_bottom_cta',{'event_category':'article','event_label':'${article.slug}'})" href="/finalwishes-checklist/index.html#products">Download Now →</a>
</div>

<div class="disclaimer">
<strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute legal or financial advice. Laws vary by jurisdiction. For estate planning, wills, trusts, and powers of attorney, consult a licensed attorney in your state. FinalWishesChecklist.com is not a law firm, funeral home, or financial institution.
</div>
</body>
</html>`;
}

// Generate all articles
const articlesDir = path.join(__dirname, 'articles');
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

articles.forEach(article => {
  const html = generateArticleHTML(article);
  const filename = path.join(articlesDir, `${article.slug}.html`);
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✅ ${article.slug}.html`);
});

console.log(`\n✅ Generated ${articles.length} articles`);
