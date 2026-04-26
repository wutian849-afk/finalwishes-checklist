#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SITE = 'https://wutian849-afk.github.io/finalwishes-checklist';
const GA_ID = 'G-DGKVNWKVDZ';

const articles = [
  // ---- FUNERAL & MEMORIAL (40) ----
  {title:"Funeral Planning Checklist Guide", slug:"funeral-planning-checklist", cat:"Funeral & Memorial", kw:"funeral planning, checklist, funeral arrangements, planning steps, funeral preparation"},
  {title:"How to Plan a Funeral Step by Step", slug:"how-to-plan-a-funeral", cat:"Funeral & Memorial", kw:"plan a funeral, funeral planning steps, funeral arrangements, organize funeral"},
  {title:"Funeral Program Template Examples", slug:"funeral-program-template", cat:"Funeral & Memorial", kw:"funeral program template, memorial program, funeral order of service, funeral leaflet"},
  {title:"Obituary Template – How to Write an Obituary", slug:"obituary-template", cat:"Funeral & Memorial", kw:"obituary template, write obituary, obituary examples, newspaper obituary, death notice"},
  {title:"Eulogy Writing Tips and Examples", slug:"eulogy-writing-tips", cat:"Funeral & Memorial", kw:"eulogy writing, funeral speech, eulogy examples, eulogy for father, eulogy for mother"},
  {title:"Memorial Service Planning Checklist", slug:"memorial-service-planning", cat:"Funeral & Memorial", kw:"memorial service planning, celebration of life, memorial ideas, service planning checklist"},
  {title:"Funeral Cost Breakdown – Average Funeral Prices", slug:"funeral-cost-breakdown", cat:"Funeral & Memorial", kw:"funeral cost, funeral prices, average funeral cost, funeral expenses, how much does a funeral cost"},
  {title:"Cremation vs Burial – Complete Comparison Guide", slug:"cremation-vs-burial-comparison-guide", cat:"Funeral & Memorial", kw:"cremation vs burial, burial vs cremation, cremation cost, burial cost, which is better cremation or burial"},
  {title:"Veteran Funeral Benefits Guide", slug:"veteran-funeral-benefits-guide", cat:"Funeral & Memorial", kw:"veteran funeral benefits, military funeral benefits, VA burial benefits, veterans death benefits, veteran funeral honors"},
  {title:"Green Burial Options – Eco-Friendly Funerals", slug:"green-burial-options", cat:"Funeral & Memorial", kw:"green burial, eco-friendly funeral, natural burial, green cemetery, environmentally friendly funeral"},
  {title:"Funeral Etiquette Guide – What You Need to Know", slug:"funeral-etiquette-guide-full", cat:"Funeral & Memorial", kw:"funeral etiquette, funeral behavior, funeral rules, proper funeral conduct, funeral customs"},
  {title:"What to Wear to a Funeral – Dress Code Guide", slug:"what-to-wear-to-a-funeral-guide", cat:"Funeral & Memorial", kw:"funeral attire, what to wear to a funeral, funeral dress code, funeral outfit, respectful clothing funeral"},
  {title:"Funeral Flower Meanings and Etiquette", slug:"funeral-flower-meanings", cat:"Funeral & Memorial", kw:"funeral flowers, sympathy flowers, flower meanings funeral, sending flowers funeral, funeral flower etiquette"},
  {title:"Funeral Music Guide – Songs for Memorial Services", slug:"funeral-music-guide", cat:"Funeral & Memorial", kw:"funeral music, memorial songs, funeral hymns, songs for funerals, funeral music suggestions"},
  {title:"Eulogy for Father – How to Write", slug:"eulogy-for-father", cat:"Funeral & Memorial", kw:"eulogy for father, tribute to dad, funeral speech father, words for dad funeral"},
  {title:"Eulogy for Mother – Writing Guide", slug:"eulogy-for-mother", cat:"Funeral & Memorial", kw:"eulogy for mother, tribute to mom, funeral speech mother, words for mom funeral, mother eulogy examples"},
  {title:"Funeral Reception Planning Guide", slug:"funeral-reception-planning", cat:"Funeral & Memorial", kw:"funeral reception, funeral gathering, repast planning, after funeral reception, funeral meal planning"},
  {title:"Graveside Service Planning", slug:"graveside-service-planning", cat:"Funeral & Memorial", kw:"graveside service, burial service, committal service, graveside ceremony, interment service"},
  {title:"Celebration of Life Ideas and Planning", slug:"celebration-of-life-ideas", cat:"Funeral & Memorial", kw:"celebration of life, life celebration ideas, celebration of life vs funeral, alternative funeral, memorial ideas"},
  {title:"Prepaid Funeral Plans Explained", slug:"prepaid-funeral-plans-explained", cat:"Funeral & Memorial", kw:"prepaid funeral, preneed funeral, funeral insurance, prepaid funeral plan, funeral preplanning payment"},
  {title:"Direct Cremation Guide – What to Expect", slug:"direct-cremation-guide", cat:"Funeral & Memorial", kw:"direct cremation, direct cremation cost, cremation without service, simple cremation, direct cremation explained"},
  {title:"Traditional Burial Process – Step by Step", slug:"traditional-burial-process", cat:"Funeral & Memorial", kw:"traditional burial, burial process, funeral burial, earth burial, burial vs cremation"},
  {title:"Funeral Poems – Readings for Memorial Services", slug:"funeral-poems-readings", cat:"Funeral & Memorial", kw:"funeral poems, memorial poems, funeral readings, bereavement poems, poems for funerals"},
  {title:"Military Funeral Honors Guide", slug:"military-funeral-honors", cat:"Funeral & Memorial", kw:"military funeral, veteran funeral honors, military burial, flag presentation, taps at funeral"},
  {title:"Funeral Pallbearer Duties Explained", slug:"funeral-pallbearer-duties", cat:"Funeral & Memorial", kw:"pallbearer duties, honorary pallbearer, casket bearer, pallbearer funeral, what does a pallbearer do"},
  {title:"Memorial Tree Planting – Meaningful Tribute", slug:"memorial-tree-planting", cat:"Funeral & Memorial", kw:"memorial tree planting, tree in memory, living memorial, plant tree in memory, memorial tree program"},
  {title:"Funeral Order of Service Template", slug:"funeral-order-of-service", cat:"Funeral & Memorial", kw:"order of service template, funeral order of service, memorial service program template, funeral leaflet design"},
  {title:"Funeral Prayer Cards and Memorial Cards", slug:"funeral-prayer-cards", cat:"Funeral & Memorial", kw:"funeral prayer cards, memorial cards, funeral remembrance cards, prayer card template, memorial card examples"},
  {title:"Funeral Thank You Cards – Etiquette and Wording", slug:"funeral-thank-you-cards", cat:"Funeral & Memorial", kw:"funeral thank you cards, thank you notes funeral, sympathy thank you, funeral acknowledgments, funeral recognition cards"},
  {title:"Bereavement Leave – Employee Rights", slug:"bereavement-leave-rights", cat:"Funeral & Memorial", kw:"bereavement leave, funeral leave, bereavement policy, paid bereavement leave, family leave death"},
  {title:"Death Notice Publication – How to Submit", slug:"death-notice-publication", cat:"Funeral & Memorial", kw:"death notice, death notice newspaper, obituary submission, paid obituary, funeral announcement"},
  {title:"Funeral Transportation Guide", slug:"funeral-transportation", cat:"Funeral & Memorial", kw:"funeral transportation, hearse, funeral car, limousine funeral, funeral procession rules"},
  {title:"Funeral Home Comparison Questionnaire", slug:"funeral-home-comparison", cat:"Funeral & Memorial", kw:"funeral home comparison, funeral home pricing, funeral home questions, choosing funeral home, funeral home costs"},
  {title:"Funeral Insurance – Burial Insurance Guide", slug:"funeral-insurance-guide", cat:"Funeral & Memorial", kw:"funeral insurance, burial insurance, final expense insurance, funeral coverage, life insurance for funeral"},
  {title:"Funeral Photography – Should You Hire One", slug:"funeral-photography", cat:"Funeral & Memorial", kw:"funeral photography, memorial photography, funeral photographer, photographing funeral, funeral pictures"},
  {title:"Donating Body to Science – Complete Guide", slug:"donating-body-to-science", cat:"Funeral & Memorial", kw:"body donation science, donate body to science, whole body donation, anatomical donation, body donation program"},
  {title:"Organ Donation After Death – What You Need to Know", slug:"organ-donation-after-death", cat:"Funeral & Memorial", kw:"organ donation, donate organs after death, organ donor registry, tissue donation, be an organ donor"},
  {title:"Funeral Planning on a Budget – Low Cost Options", slug:"funeral-budget-options", cat:"Funeral & Memorial", kw:"low cost funeral, budget funeral, affordable funeral, cheap funeral options, funeral financial assistance"},
  {title:"Funeral Trust Fund Planning", slug:"funeral-trust-fund", cat:"Funeral & Memorial", kw:"funeral trust, burial trust, Totten trust, payable on death funeral, funeral funding"},
  {title:"Memorial Donations – How to Set Up", slug:"memorial-donations", cat:"Funeral & Memorial", kw:"memorial donations, in lieu of flowers, memorial fund, charity donation funeral, memorial contributions"},

  // ---- AFTER DEATH (45) ----
  {title:"What to Do When Someone Dies – First Steps Checklist", slug:"what-to-do-when-someone-dies-first-steps", cat:"After Death", kw:"what to do when someone dies, first steps after death, death checklist, someone died what to do"},
  {title:"Who to Call When Someone Dies – Emergency Contact List", slug:"who-to-call-when-someone-dies", cat:"After Death", kw:"who to call when someone dies, death notification, emergency contacts death, call list after death"},
  {title:"Death Certificate – How to Get Copies", slug:"death-certificate-copies", cat:"After Death", kw:"death certificate, obtain death certificate, death certificate copies, certified death certificate, vital records"},
  {title:"Notify Social Security of a Death – Complete Guide", slug:"notify-social-security-death", cat:"After Death", kw:"notify social security of death, social security death benefit, SSA death notification, stop social security payments"},
  {title:"How to File a Life Insurance Claim", slug:"file-life-insurance-claim-guide", cat:"After Death", kw:"life insurance claim, file life insurance claim, death benefit claim, life insurance payout, claim life insurance"},
  {title:"How to Close Bank Accounts After Death", slug:"close-bank-accounts-after-death-guide", cat:"After Death", kw:"close bank account after death, deceased bank account, bank accounts deceased, joint account death"},
  {title:"How to Cancel Credit Cards of a Deceased Person", slug:"cancel-credit-cards-deceased-guide", cat:"After Death", kw:"cancel credit cards after death, credit card deceased, notify credit card death, credit card debt death"},
  {title:"What Happens to Joint Bank Accounts When One Person Dies", slug:"joint-bank-account-when-one-dies", cat:"After Death", kw:"joint bank account death, right of survivorship, joint account when one dies, JTWROS, tenants by entirety"},
  {title:"Notify Employer of Death – What to Do", slug:"notify-employer-of-death", cat:"After Death", kw:"notify employer death, deceased employee, employer death notification, final paycheck death, COBRA death"},
  {title:"Notify Utility Companies After a Death", slug:"notify-utility-companies-death", cat:"After Death", kw:"utility companies after death, cancel utilities death, transfer utilities death, electric death"},
  {title:"Probate Process Explained – A Complete Guide", slug:"probate-process-explained-complete", cat:"After Death", kw:"probate process, what is probate, probate explained, probate court, probate timeline"},
  {title:"Probate Costs and Fees – What to Expect", slug:"probate-costs-fees", cat:"After Death", kw:"probate costs, probate fees, cost of probate, probate attorney fees, probate expenses"},
  {title:"Executor Duties – Complete Checklist", slug:"executor-duties-checklist", cat:"After Death", kw:"executor duties, executor checklist, what executor does, executor responsibilities, estate executor guide"},
  {title:"Executor Compensation – How Much Do Executors Get Paid", slug:"executor-compensation", cat:"After Death", kw:"executor compensation, executor fees, executor payment, how much executor gets paid, executor commission"},
  {title:"How to Find a Will After Someone Dies", slug:"find-will-after-death", cat:"After Death", kw:"find a will, locate will after death, where to find will, lost will, will search, will safekeeping"},
  {title:"What Happens If Someone Dies Without a Will", slug:"dies-without-will-intestate", cat:"After Death", kw:"intestate death, dying without a will, intestate succession, who inherits without will, no will death"},
  {title:"How to Find a Probate Attorney", slug:"find-probate-attorney", cat:"After Death", kw:"probate attorney, probate lawyer, find probate attorney, estate lawyer, probate legal help"},
  {title:"Transfer Property Ownership After Death", slug:"transfer-property-after-death", cat:"After Death", kw:"transfer property after death, transfer deed death, property inheritance, real estate death, house inheritance"},
  {title:"What Debts Are Forgiven at Death", slug:"debts-forgiven-at-death-guide", cat:"After Death", kw:"debts after death, debt forgiveness death, which debts die with you, medical debt after death"},
  {title:"Medical Bills After Death – Who Pays", slug:"medical-bills-after-death", cat:"After Death", kw:"medical bills after death, hospital bills death, who pays medical bills when someone dies"},
  {title:"Mortgage After Death – What Happens to the House", slug:"mortgage-after-death", cat:"After Death", kw:"mortgage after death, house mortgage when owner dies, mortgage inheritance, assumption mortgage death"},
  {title:"Student Loan Death Discharge – Complete Guide", slug:"student-loan-death-discharge", cat:"After Death", kw:"student loan death discharge, federal student loan death, private student loan death, death discharge application"},
  {title:"Estate Sale After Death – How It Works", slug:"estate-sale-after-death", cat:"After Death", kw:"estate sale, estate sale after death, estate liquidation, sell deceased belongings, estate sale company"},
  {title:"Safe Deposit Box After Death – Access Rules", slug:"safe-deposit-box-after-death", cat:"After Death", kw:"safe deposit box death, access safe deposit box, deceased box, bank box inheritance"},
  {title:"Death Notification Checklist – Who to Tell", slug:"death-notification-checklist", cat:"After Death", kw:"death notification list, who to notify when someone dies, death notification checklist, notify family death"},
  {title:"Online Obituary Options – Where to Publish", slug:"online-obituary-options", cat:"After Death", kw:"online obituary, obituary website, memorial website, legacy.com, forevermissed obituary"},
  {title:"Social Media Death Announcement – What to Post", slug:"social-media-death-announcement", cat:"After Death", kw:"death announcement social media, Facebook death post, Instagram death announcement, announcing death online"},
  {title:"What to Do When a Parent Dies – Practical Guide", slug:"what-to-do-when-parent-dies", cat:"After Death", kw:"what to do when parent dies, parent death checklist, both parents die, handling parent affairs"},
  {title:"What to Do When a Spouse Dies – Emotional and Practical", slug:"what-to-do-when-spouse-dies", cat:"After Death", kw:"what to do when spouse dies, widowed checklist, husband died what to do, wife died what to do"},
  {title:"What to Do When a Child Dies – Coping and Logistics", slug:"what-to-do-when-child-dies", cat:"After Death", kw:"child death, what to do when child dies, loss of child, bereaved parent, infant death"},
  {title:"What to Do When a Sibling Dies", slug:"what-to-do-when-sibling-dies", cat:"After Death", kw:"sibling death, what to do when brother dies, what to do when sister dies, sibling loss"},
  {title:"Coroner vs Medical Examiner – What's the Difference", slug:"coroner-vs-medical-examiner", cat:"After Death", kw:"coroner vs medical examiner, coroner investigation, medical examiner role, cause of death investigation"},
  {title:"Autopsy Information – What to Expect", slug:"autopsy-information", cat:"After Death", kw:"autopsy, autopsy procedure, autopsy results, family autopsy, religious objections autopsy"},
  {title:"Government Death Benefits – What's Available", slug:"government-death-benefits", cat:"After Death", kw:"government death benefits, death benefit, federal death benefits, survivor benefits, death grant"},
  {title:"Applying for Social Security Death Benefits", slug:"applying-social-security-death-benefits", cat:"After Death", kw:"death benefit social security, SSDI death benefit, lump sum death payment, social security survivor benefits"},
  {title:"Car Loan After Death – What Happens", slug:"car-loan-after-death", cat:"After Death", kw:"car loan after death, vehicle loan death, auto loan inheritance, car loan cosigner dies"},
  {title:"Veterans Death Benefits – What Families Should Know", slug:"veterans-death-benefits", cat:"After Death", kw:"Veterans death benefits, VA survivor benefits, DIC benefit, burial allowance VA, surviving spouse VA"},
  {title:"What to Do When a Friend Dies", slug:"what-to-do-when-friend-dies", cat:"After Death", kw:"friend death, close friend dies, friend loss, supporting friend funeral, colleague death"},
  {title:"What Happens to Life Insurance if No Beneficiary", slug:"life-insurance-no-beneficiary", cat:"After Death", kw:"life insurance without beneficiary, estate as beneficiary, life insurance death, life insurance payout estate pro"},
  {title:"How to Claim Death Benefits from Employer", slug:"claim-employer-death-benefits", cat:"After Death", kw:"employer death benefit, company death benefit, 401k death, pension death benefit, group life insurance death"},
  {title:"IRS Death Notification – Filing Final Taxes", slug:"irs-death-notification", cat:"After Death", kw:"IRS notify death, final tax return deceased, estate tax ID, Form 56, final 1040 death"},
  {title:"Medicare Death Notification", slug:"medicare-death-notification", cat:"After Death", kw:"notify Medicare death, Medicare benefits death, stop Medicare after death, Medicare notification"},
  {title:"Credit Score After Death – What Happens", slug:"credit-score-after-death", cat:"After Death", kw:"credit score death, deceased credit report, credit bureau death notification, credit freeze death"},
  {title:"Passport Cancellation After Death", slug:"passport-cancellation-after-death", cat:"After Death", kw:"cancel passport death, deceased passport, passport return, US Department of State death notification"},
  {title:"Driver's License Cancellation After Death", slug:"drivers-license-cancellation-death", cat:"After Death", kw:"cancel drivers license death, DMV death notification, state ID cancellation deceased"},
];

// Template function
function genArticle(a) {
  const today = '2026-04-26';
  const intro = `${a.title} is one of the most important steps you can take to protect your loved ones. This comprehensive guide walks you through everything you need to do.`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${a.title} | FinalWishesChecklist</title>
<meta name="description" content="${a.title}. A compassionate step-by-step guide. Free PDF checklist available for download.">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${SITE}/articles/${a.slug}.html">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');</script>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:720px;margin:0 auto;padding:24px 20px 80px;color:#1e293b;line-height:1.7;font-size:15px;background:#faf8f5}
h1{font-size:28px;font-weight:700;margin-bottom:6px;line-height:1.2;color:#1e293b}
.meta{font-size:12px;color:#94a3b8;margin-bottom:20px}
h2{font-size:20px;font-weight:600;margin-top:32px;margin-bottom:10px;color:#334155;border-bottom:1px solid #e2e8f0;padding-bottom:6px}
h3{font-size:16px;font-weight:600;margin-top:22px;margin-bottom:8px;color:#475569}
p{margin-bottom:14px;color:#475569}
ul,ol{margin:0 0 14px 20px;color:#475569;font-size:14px;line-height:1.6}
li{margin-bottom:4px}
.cta-box{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin:28px 0;text-align:center;font-size:14px}
.cta-box strong{color:#92400e;display:block;margin-bottom:6px}
.cta-box a{display:inline-block;padding:10px 24px;background:#fbbf24;color:#1e293b;border-radius:8px;font-weight:600;text-decoration:none;margin-top:6px;font-size:13px}
.cta-box a:hover{background:#f59e0b}
.related{background:#f1f5f9;border-radius:8px;padding:12px 16px;font-size:13px;margin:20px 0}
.related a{color:#475569;text-decoration:none;display:block;padding:3px 0}
.related a:hover{color:#1e293b;text-decoration:underline}
.disc{font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:16px;margin-top:32px}
table{width:100%;border-collapse:collapse;margin:14px 0;font-size:13px}
td,th{border:1px solid #e2e8f0;padding:8px 12px;text-align:left}
th{background:#f8fafc;font-weight:600;color:#334155}
</style>
</head>
<body>

<h1>${a.title}</h1>
<div class="meta">Category: ${a.cat} · Tags: ${a.kw} · Updated: April 2026</div>

<p>${intro}</p>

<div class="cta-box">
<strong>📋 Download the Free ${a.cat} Checklist</strong>
Get our comprehensive printable PDF with all the steps organized for you.
<a href="/finalwishes-checklist/#products">Browse Checklists →</a>
</div>

<h2>Why This Matters</h2>
<p>${a.title} is something every family will face, yet most people are completely unprepared for it. Without a structured plan, grieving families are forced to make expensive decisions under emotional pressure.</p>
<p>The average funeral in the United States costs between $7,000 and $12,000. Estate settlement takes six months to two years. Having a clear roadmap can save you thousands of dollars and months of confusion.</p>

<h2>Key Steps to Follow</h2>

<h3>1. Take a Structured Approach</h3>
<p>The most common mistake is trying to do everything at once. Break down the process into manageable phases. Our checklists are designed to guide you through each phase in order — from immediate steps in the first 24 hours, to longer-term tasks that span weeks and months.</p>

<h3>2. Gather Important Information</h3>
<p>Before making any decisions, collect the following: identification documents, legal agreements (wills, trusts, POAs), financial account information, insurance policies, funeral preplanning documents, and contact information for attorneys, executors, and beneficiaries.</p>

<h3>3. Prioritize Tasks by Urgency</h3>
<p>Some tasks must be done within hours or days: notifying close family, making funeral arrangements, and securing property. Others, like estate administration and filing final tax returns, can wait weeks or months. Our checklist organizes everything by urgency level.</p>

<h3>4. Get Professional Help When Needed</h3>
<p>For complex estates, probate, or contested wills, consult with a licensed attorney. For tax matters, a CPA is essential. Many resources are available at little or no cost — including free consultations, pro bono legal clinics, and nonprofit counseling services.</p>

<h3>5. Take Care of Yourself</h3>
<p>Planning and grief are both exhausting. Make sure to eat, rest, and accept help from others. You don't have to do everything alone.</p>

<h2>Common Questions About ${a.title}</h2>
<p>People searching for "${a.kw.split(',')[0].trim()}" frequently ask:</p>
<ul>
<li>How long does the process take?</li>
<li>What documents are most important to have ready?</li>
<li>Do I need a lawyer, or can I do it myself?</li>
<li>How much does it cost?</li>
<li>Where can I find reliable forms and templates?</li>
</ul>
<p>Each of these questions is addressed in our specialized checklists. The goal is to give you confidence that you're not missing anything important.</p>

<h2>Get the Complete Planning Checklist</h2>
<p>Our downloadable PDF checklists cover every detail with comprehensive checkboxes, space for personal notes, and expert guidance. No signup required — just download and start planning.</p>

<div class="cta-box">
<strong>📥 Download the ${a.cat} Checklist</strong>
Instant PDF download. Print-friendly. Share with family members.
<a href="/finalwishes-checklist/#products">Download Now →</a>
</div>

<div class="related">
<strong>Related guides you may find helpful:</strong>
<a href="/finalwishes-checklist/articles/what-to-do-when-someone-dies-first-steps.html">What to Do When Someone Dies – First Steps</a>
<a href="/finalwishes-checklist/articles/end-of-life-planning-guide.html">Complete End-of-Life Planning Guide</a>
<a href="/finalwishes-checklist/articles/how-to-plan-a-funeral.html">How to Plan a Funeral</a>
<a href="/finalwishes-checklist/articles/probate-process-explained-complete.html">Probate Process Explained</a>
</div>

<div class="disc">
<strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute legal or financial advice. Laws vary by jurisdiction. For estate planning, wills, trusts, and powers of attorney, consult a licensed attorney. FinalWishesChecklist.com is not a law firm, funeral home, or financial institution.
</div>
</body>
</html>`;
}

// Generate
const dir = __dirname + '/articles';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

articles.forEach(a => {
  const html = genArticle(a);
  const p = dir + '/' + a.slug + '.html';
  fs.writeFileSync(p, html, 'utf8');
  console.log('✅', a.slug);
});

console.log('\n✅ Done. Generated ' + articles.length + ' articles.');
console.log('Total files in articles/:', fs.readdirSync(dir).filter(f => f.endsWith('.html')).length);
