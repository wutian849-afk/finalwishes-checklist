#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const SITE = 'https://wutian849-afk.github.io/finalwishes-checklist';
const GA_ID = 'G-DGKVNWKVDZ';

const batch = [
  // -- ESTATE & LEGAL (45) --
  {title:"Estate Planning Checklist – Complete Guide", slug:"estate-planning-checklist-guide", cat:"Estate & Legal", kw:"estate planning, checklist, estate plan, estate planning checklist, comprehensive estate plan"},
  {title:"Last Will and Testament – Complete Guide", slug:"last-will-and-testament-complete", cat:"Estate & Legal", kw:"last will and testament, what is a will, how to write a will, will template, legal will"},
  {title:"Living Trust Explained – Revocable vs Irrevocable", slug:"living-trust-explained", cat:"Estate & Legal", kw:"living trust, revocable trust, irrevocable trust, trust vs will, trust fund benefits"},
  {title:"Revocable vs Irrevocable Trust – Which Is Right for You", slug:"revocable-vs-irrevocable-trust", cat:"Estate & Legal", kw:"revocable trust, irrevocable trust, trust comparison, trust types, estate planning trust"},
  {title:"Will vs Trust – Key Differences Explained", slug:"will-vs-trust-differences", cat:"Estate & Legal", kw:"will vs trust, trust vs will, difference between will and trust, probate vs trust"},
  {title:"Power of Attorney Types – Complete Guide", slug:"power-of-attorney-types-complete", cat:"Estate & Legal", kw:"power of attorney types, POA types, financial power of attorney, durable POA, springing POA"},
  {title:"Durable Power of Attorney – What You Need to Know", slug:"durable-power-of-attorney", cat:"Estate & Legal", kw:"durable power of attorney, durable POA, financial POA, lasting POA, durable power vs general"},
  {title:"Medical Power of Attorney – Healthcare Proxy Guide", slug:"medical-power-of-attorney-healthcare", cat:"Estate & Legal", kw:"medical power of attorney, healthcare proxy, healthcare POA, medical decision maker, health care agent"},
  {title:"Financial Power of Attorney – Managing Money for Others", slug:"financial-power-of-attorney", cat:"Estate & Legal", kw:"financial power of attorney, financial POA, property POA, manage finances POA, bank POA"},
  {title:"Springing Power of Attorney vs Immediate", slug:"springing-power-of-attorney", cat:"Estate & Legal", kw:"springing power of attorney, immediate POA, springing vs durable, POA trigger, incapacity POA"},
  {title:"Living Will vs Last Will – What's the Difference", slug:"living-will-vs-last-will", cat:"Estate & Legal", kw:"living will vs last will, living will, advance directive, will difference, healthcare directive"},
  {title:"Advance Directive Forms by State", slug:"advance-directive-by-state", cat:"Estate & Legal", kw:"advance directive, advance directive forms, living will by state, healthcare directive state, advance care planning"},
  {title:"Do Not Resuscitate Order – Complete Guide", slug:"do-not-resuscitate-order-guide", cat:"Estate & Legal", kw:"DNR order, do not resuscitate, DNR form, DNR vs living will, DNR at home, DNR bracelet"},
  {title:"Estate Tax Explained – Federal and State", slug:"estate-tax-explained", cat:"Estate & Legal", kw:"estate tax, inheritance tax, federal estate tax, state estate tax, death tax, estate tax exemption"},
  {title:"Inheritance Tax by State – Which States Charge It", slug:"inheritance-tax-by-state", cat:"Estate & Legal", kw:"inheritance tax, state inheritance tax, who pays inheritance tax, beneficiary tax, inheritance tax rate"},
  {title:"Federal Estate Tax Exemption – Current Limits", slug:"federal-estate-tax-exemption", cat:"Estate & Legal", kw:"federal estate tax exemption, estate tax limit, lifetime exemption, gift tax exemption, estate tax filing"},
  {title:"Probate Avoidance Strategies – How to Avoid Probate", slug:"probate-avoidance-strategies", cat:"Estate & Legal", kw:"avoid probate, probate avoidance, living trust avoid probate, transfer on death, payable on death"},
  {title:"Beneficiary Designation Guide – Do It Right", slug:"beneficiary-designation-guide", cat:"Estate & Legal", kw:"beneficiary designation, naming beneficiaries, retirement beneficiary, life insurance beneficiary, contingent beneficiary"},
  {title:"Special Needs Trust – Protecting Benefits", slug:"special-needs-trust", cat:"Estate & Legal", kw:"special needs trust, SNT, supplemental needs trust, disability trust, medicaid trust, special needs planning"},
  {title:"Charitable Trust – Donate and Save on Taxes", slug:"charitable-trust-guide", cat:"Estate & Legal", kw:"charitable trust, charitable remainder trust, CRUT, CRAT, charitable lead trust, charitable giving estate"},
  {title:"Transfer on Death Deed – Avoiding Probate for Real Estate", slug:"transfer-on-death-deed", cat:"Estate & Legal", kw:"transfer on death deed, TOD deed, beneficiary deed, lady bird deed, real estate probate avoidance"},
  {title:"Payable on Death Accounts – Bank Account Beneficiaries", slug:"payable-on-death-accounts", cat:"Estate & Legal", kw:"payable on death, POD account, transfer on death bank, beneficiary bank account, POD designation"},
  {title:"Executor vs Trustee – Role Differences", slug:"executor-vs-trustee", cat:"Estate & Legal", kw:"executor vs trustee, difference executor trustee, personal representative vs trustee, estate roles"},
  {title:"Estate Attorney Costs – What to Expect", slug:"estate-attorney-costs", cat:"Estate & Legal", kw:"estate attorney costs, estate lawyer fees, probate attorney cost, will attorney cost, estate planning fee"},
  {title:"Online Will Services Review – Which Is Best", slug:"online-will-services-review", cat:"Estate & Legal", kw:"online will, will online, LegalZoom will, TrustWill, Rocket Lawyer will, online estate planning"},
  {title:"Legal Guardianship for Children – Estate Planning for Parents", slug:"legal-guardianship-children", cat:"Estate & Legal", kw:"guardianship children, legal guardian, naming guardian, child guardian will, guardian for minor children"},
  {title:"Pet Trust Planning – Ensure Your Pet Is Cared For", slug:"pet-trust-planning", cat:"Estate & Legal", kw:"pet trust, animal trust, pet planning, pet protection, pet care after death, pet inheritance"},
  {title:"Will Contest – Grounds for Challenging a Will", slug:"will-contest-grounds", cat:"Estate & Legal", kw:"will contest, challenge a will, contesting a will, undue influence, lack of capacity, will validity"},
  {title:"Estate Distribution Order – Who Gets Paid First", slug:"estate-distribution-order", cat:"Estate & Legal", kw:"estate distribution, priority of payment, estate creditors, executor payment order, claims against estate"},
  {title:"Elective Share Rights – What Surviving Spouses Are Entitled To", slug:"elective-share-rights", cat:"Estate & Legal", kw:"elective share, spousal right, surviving spouse inheritance, forced share, spouse elective share"},
  {title:"Disinheriting a Child – Legal Considerations", slug:"disinheriting-child", cat:"Estate & Legal", kw:"disinherit child, disinheritance, leaving child out of will, omitted heir, child inheritance"},
  {title:"Community Property and Estate Planning", slug:"community-property-estate", cat:"Estate & Legal", kw:"community property, separate property, marital property, community property states, death community property"},
  {title:"Elder Law Planning – Protecting Assets in Later Life", slug:"elder-law-planning", cat:"Estate & Legal", kw:"elder law, senior planning, aging parent estate, elder care plan, elder law attorney"},
  {title:"Medicaid Asset Protection – Qualifying While Keeping Assets", slug:"medicaid-asset-protection", cat:"Estate & Legal", kw:"Medicaid planning, asset protection, nursing home Medicaid, Medicaid eligibility, spend down Medicaid"},
  {title:"Nursing Home Planning – Legal and Financial Strategies", slug:"nursing-home-planning", cat:"Estate & Legal", kw:"nursing home planning, long-term care, nursing home costs, assisted living planning, elder care costs"},
  {title:"Incapacity Planning – Documents You Need", slug:"incapacity-planning-documents", cat:"Estate & Legal", kw:"incapacity planning, disability planning, what happens if incapacitated, POA disability, guardianship"},
  {title:"Estate Planning for Unmarried Couples", slug:"estate-planning-unmarried-couples", cat:"Estate & Legal", kw:"unmarried couples estate planning, domestic partners, inheritance without marriage, cohabitation legal"},
  {title:"Tenants in Common vs Joint Tenancy", slug:"tenants-in-common-joint-tenancy", cat:"Estate & Legal", kw:"tenants in common, joint tenancy, joint tenancy right of survivorship JTWROS, TIC vs joint"},
  {title:"Holographic Will Validity by State", slug:"holographic-will-validity", cat:"Estate & Legal", kw:"holographic will, handwritten will, will without witnesses, homemade will, holographic will states"},
  {title:"Pour Over Will – How It Works with a Trust", slug:"pour-over-will", cat:"Estate & Legal", kw:"pour over will, trust will, pour over will trust, will funding trust, catch-all will"},
  {title:"Estate Recovery – Medicaid Recovery After Death", slug:"estate-recovery-medicaid", cat:"Estate & Legal", kw:"Medicaid estate recovery, MERS, nursing home death, estate recovery claim, Medicaid lien"},

  // -- DIGITAL LEGACY (30) --
  {title:"Digital Legacy Plan – Complete Guide", slug:"digital-legacy-plan-complete", cat:"Digital Legacy", kw:"digital legacy, digital estate, online legacy, digital inheritance, digital afterlife"},
  {title:"What Happens to Your Facebook Account When You Die", slug:"facebook-after-death", cat:"Digital Legacy", kw:"Facebook memorialization, memorial account Facebook, Facebook legacy contact, Facebook death policy"},
  {title:"Instagram Memorial Account – How It Works", slug:"instagram-memorial-account", cat:"Digital Legacy", kw:"Instagram memorial, memorialize Instagram, Instagram legacy, Instagram death account"},
  {title:"Google Inactive Account Manager – Set It Up", slug:"google-inactive-account-manager", cat:"Digital Legacy", kw:"Google Inactive Account Manager, Google death policy, Google account death, data death Google"},
  {title:"Apple Digital Legacy – How to Add a Legacy Contact", slug:"apple-digital-legacy", cat:"Digital Legacy", kw:"Apple digital legacy, Apple legacy contact, iCloud death, iPhone death, Apple account death"},
  {title:"What Happens to iCloud Data After Death", slug:"icloud-after-death", cat:"Digital Legacy", kw:"iCloud after death, Apple data death, iCloud photos death, icloud account inheritance"},
  {title:"Cryptocurrency Inheritance – Leaving Bitcoin to Heirs", slug:"cryptocurrency-inheritance", cat:"Digital Legacy", kw:"cryptocurrency inheritance, Bitcoin inheritance, crypto will, crypto estate planning, digital asset will"},
  {title:"Bitcoin Will – How to Include Crypto in Your Estate Plan", slug:"bitcoin-will-estate", cat:"Digital Legacy", kw:"Bitcoin will, crypto will, cryptocurrency estate, passing crypto to heirs, crypto beneficiary"},
  {title:"Password Inheritance – Leaving Access to Loved Ones", slug:"password-inheritance", cat:"Digital Legacy", kw:"password inheritance, digital password will, password manager estate, legacy password access"},
  {title:"Digital Executor – Appointing Someone to Manage Your Digital Life", slug:"digital-executor-duties", cat:"Digital Legacy", kw:"digital executor, digital estate executor, online executor, tech executor, digital fiduciary"},
  {title:"Online Accounts Executor – How to Manage After Death", slug:"online-accounts-executor", cat:"Digital Legacy", kw:"online accounts after death, digital accounts executor, manage online accounts deceased"},
  {title:"Gmail After Death – How to Access a Deceased Person's Email", slug:"gmail-after-death", cat:"Digital Legacy", kw:"gmail after death, deceased gmail account, access gmail deceased, gmail death policy"},
  {title:"Microsoft Account After Death", slug:"microsoft-account-after-death", cat:"Digital Legacy", kw:"Microsoft account death, Outlook death, OneDrive data death, Microsoft deceased user, Hotmail death"},
  {title:"Digital Photo Inheritance – Preserving Family Photos", slug:"digital-photo-inheritance", cat:"Digital Legacy", kw:"digital photo inheritance, photo after death, Google Photos death, iCloud photos inheritance, digital memories"},
  {title:"Social Media Will – Documenting Your Online Wishes", slug:"social-media-will", cat:"Digital Legacy", kw:"social media will, online will, social media policy death, death social media, digital will template"},
  {title:"Crypto Wallet Succession – Planning for Digital Assets", slug:"crypto-wallet-succession", cat:"Digital Legacy", kw:"crypto wallet inheritance, wallet succession, private key inheritance, hardware wallet death, seed phrase"},
  {title:"NFT Inheritance – Passing Digital Collectibles", slug:"nft-inheritance", cat:"Digital Legacy", kw:"NFT inheritance, digital collectible inheritance, NFT will, crypto art inheritance, token legacy"},
  {title:"Digital Asset Inventory – Creating a Complete List", slug:"digital-asset-inventory", cat:"Digital Legacy", kw:"digital asset inventory, online accounts list, digital accounts checklist, password inventory, technology inventory"},
  {title:"Cloud Storage After Death – What Happens to Your Files", slug:"cloud-storage-after-death", cat:"Digital Legacy", kw:"cloud storage death, Dropbox death, Google Drive death, OneDrive death, iCloud death files"},
  {title:"Subscription Services After Death – Cancel or Transfer", slug:"subscriptions-after-death", cat:"Digital Legacy", kw:"cancel subscriptions death, streaming services death, Netflix death, subscriptions deceased, transfer subscriptions"},
  {title:"Website Domain Inheritance – What Happens to Your Sites", slug:"website-domain-inheritance", cat:"Digital Legacy", kw:"domain inheritance, website death, domain name death, website ownership death, website executor"},
  {title:"Online Business Succession – Passing Your Internet Business", slug:"online-business-succession", cat:"Digital Legacy", kw:"online business succession, internet business death, ecommerce inheritance, website business, digital business will"},
  {title:"Digital Memorial – Creating an Online Memorial", slug:"digital-memorial", cat:"Digital Legacy", kw:"digital memorial, online memorial, virtual memorial website, memorial webpage, in memory website"},
  {title:"Tech Company Death Policies – Major Platforms", slug:"tech-company-death-policies", cat:"Digital Legacy", kw:"death policies tech companies, Facebook death policy, Google death policy, Apple death policy, Microsoft death"},
  {title:"Digital Afterlife Services – Managing a Digital Legacy", slug:"digital-afterlife-services", cat:"Digital Legacy", kw:"digital afterlife, legacy services, death tech, digital legacy service, online legacy company"},
  {title:"Email After Death – What to Do with Accounts", slug:"email-after-death-guide", cat:"Digital Legacy", kw:"email death, email accounts deceased, close email after death, transfer email death"},
  {title:"R.I.P. Mode – How Tech Companies Handle Death", slug:"rip-mode-tech-companies", cat:"Digital Legacy", kw:"RIP mode, death mode tech, deceased user policy, digital death process, company death notification"},

  // -- MEDICAL & EOL (25) --
  {title:"Living Will Forms – Complete Guide", slug:"living-will-forms-guide", cat:"Medical & EOL", kw:"living will form, advance directive form, living will template, healthcare directive, end of life wishes"},
  {title:"Hospice vs Palliative Care – Understanding the Difference", slug:"hospice-vs-palliative-care", cat:"Medical & EOL", kw:"hospice vs palliative care, what is hospice, what is palliative care, hospice explained"},
  {title:"Hospice Eligibility – When Is It Time", slug:"hospice-eligibility-criteria", cat:"Medical & EOL", kw:"hospice eligibility, who qualifies for hospice, hospice criteria, prognosis hospice, 6 month rule hospice"},
  {title:"What Is Hospice Care – A Complete Overview", slug:"what-is-hospice-care", cat:"Medical & EOL", kw:"what is hospice care, hospice explained, hospice services, hospice team, hospice at home"},
  {title:"Palliative Care Benefits – Improving Quality of Life", slug:"palliative-care-benefits", cat:"Medical & EOL", kw:"palliative care, palliative care benefits, palliative care vs hospice, palliative treatment"},
  {title:"End of Life Symptoms – What to Expect", slug:"end-of-life-symptoms", cat:"Medical & EOL", kw:"end of life symptoms, signs of dying, active dying, terminal symptoms, last days of life"},
  {title:"Terminal Illness Planning – Practical Guide", slug:"terminal-illness-planning", cat:"Medical & EOL", kw:"terminal illness, terminal diagnosis, planning terminal illness, terminal care, end stage disease"},
  {title:"Health Care Agent – Choosing Your Medical Decision Maker", slug:"health-care-agent-duties", cat:"Medical & EOL", kw:"health care agent, medical decision maker, healthcare proxy duties, health agent, proxy obligations"},
  {title:"HIPAA Release Form – Why You Need One", slug:"hipaa-release-form-guide", cat:"Medical & EOL", kw:"HIPAA release, HIPAA authorization, medical records access, HIPAA form, health information release"},
  {title:"Do Not Intubate Order – What DNI Means", slug:"do-not-intubate-order", cat:"Medical & EOL", kw:"do not intubate, DNI order, DNI vs DNR, intubation decision, breathing tube, life support intubation"},
  {title:"POLST Form – Physician Orders for Life-Sustaining Treatment", slug:"polst-form", cat:"Medical & EOL", kw:"POLST form, physician orders life-sustaining treatment, medical orders end of life, portable medical order"},
  {title:"Artificial Nutrition and Hydration Decisions", slug:"artificial-nutrition-decisions", cat:"Medical & EOL", kw:"artificial nutrition, feeding tube, hydration end of life, PEG tube death, nutrition withdrawal"},
  {title:"Pain Management at End of Life", slug:"pain-management-end-of-life", cat:"Medical & EOL", kw:"pain management end of life, hospice pain, terminal pain relief, palliative sedation, comfort measures"},
  {title:"Comfort Care vs Hospice – What's the Difference", slug:"comfort-care-vs-hospice", cat:"Medical & EOL", kw:"comfort care, hospice vs comfort care, comfort measures, end of life comfort, palliative comfort care"},
  {title:"Hospice Medicare Benefit – What Is Covered", slug:"hospice-medicare-benefit", cat:"Medical & EOL", kw:"Medicare hospice benefit, hospice Medicare, Medicare Part A hospice, hospice coverage, hospice costs Medicare"},
  {title:"Choosing a Hospice Provider – What to Look For", slug:"choosing-hospice-provider", cat:"Medical & EOL", kw:"choosing hospice, hospice provider, hospice agency, hospice comparison, best hospice questions"},
  {title:"End of Life Doula – Death Doulas Explained", slug:"end-of-life-doula", cat:"Medical & EOL", kw:"end of life doula, death doula, dying doula, death midwife, end of life supporter, soul midwife"},
  {title:"Five Wishes Document – Complete Guide", slug:"five-wishes-document-guide", cat:"Medical & EOL", kw:"Five Wishes, Five Wishes document, aging with dignity, advance directive Five Wishes, end of life wishes"},
  {title:"Advance Care Planning – Starting the Conversation", slug:"advance-care-planning", cat:"Medical & EOL", kw:"advance care planning, ACP, end of life conversation, advance directive discussion, healthcare planning"},
  {title:"Death Doula Services – What They Offer", slug:"death-doula-services", cat:"Medical & EOL", kw:"death doula services, doula near me, end of life doula cost, death doula training, doula certification"},
  {title:"Hospice Team Members – Who's Who", slug:"hospice-team-members", cat:"Medical & EOL", kw:"hospice team, hospice nurse, hospice doctor, social worker hospice, chaplain hospice, hospice volunteer"},
  {title:"Bereavement Services Through Hospice", slug:"bereavement-services-hospice", cat:"Medical & EOL", kw:"hospice bereavement, grief counseling hospice, hospice after death, bereavement support hospice"},
  {title:"Withdrawing Life Support – What to Expect", slug:"withdrawing-life-support", cat:"Medical & EOL", kw:"withdrawing life support, remove life support, terminal extubation, ventilator removal, life support decision"},
];

function genArticle(a) {
  const today = '2026-04-26';
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
</style>
</head>
<body>

<h1>${a.title}</h1>
<div class="meta">Category: ${a.cat} · Tags: ${a.kw} · Updated: April 2026</div>

<p>${a.title} is one of the most important aspects of end-of-life planning. This comprehensive guide walks you through everything you need to know, from understanding your options to taking practical action steps.</p>

<div class="cta-box">
<strong>📋 Download the Free ${a.cat} Checklist</strong>
Get our comprehensive printable PDF with all the essential information organized for you.
<a href="/finalwishes-checklist/#products">Browse Checklists →</a>
</div>

<h2>Why This Matters</h2>
<p>${a.cat} affects millions of American families every year, yet most people are not fully informed about their options. Without proper planning, families can face unnecessary stress, legal complications, and financial burdens during already difficult times.</p>
<p>In the United States, end-of-life medical care accounts for roughly 25% of all healthcare spending. Making informed decisions can have a significant impact on both quality of life and financial outcomes.</p>

<h2>Key Points to Understand</h2>
<p>Here are the most important things to know about ${a.title.toLowerCase()}.</p>
<ul>
<li>Start the conversation early — don't wait until a crisis</li>
<li>Each state has specific laws and forms — use documents tailored to your jurisdiction</li>
<li>Consult with professionals for complex situations — attorneys, doctors, and financial advisors</li>
<li>Review and update your plans regularly, especially after major life changes</li>
<li>Communicate your wishes to your family and healthcare agents</li>
</ul>

<h2>Step-by-Step Approach</h2>
<h3>1. Educate Yourself</h3>
<p>Learn about the different options available in your state. Laws and resources vary significantly depending on where you live. Our guides provide general information, but always verify with state-specific resources.</p>

<h3>2. Document Your Wishes</h3>
<p>Use the appropriate legal forms and templates to document your decisions. Having written documentation signed and witnessed appropriately is crucial for ensuring your wishes are followed.</p>

<h3>3. Share with Your Support System</h3>
<p>Let your family, healthcare proxy, and attorney know where your documents are stored and what your wishes are. A document that no one can find is no better than no document at all.</p>

<h3>4. Review and Update Regularly</h3>
<p>Life changes — marriages, divorces, births, deaths, moves to new states, and changes in health status — should trigger a review of your plans. Set a reminder to review everything annually.</p>

<h2>Frequently Asked Questions About ${a.title}</h2>
<p>People searching for "${a.kw.split(',')[0].trim()}" often have these additional questions:</p>
<ul>
<li>Where do I get the correct forms for my state?</li>
<li>Does this need to be notarized or witnessed?</li>
<li>How often should I update my documents?</li>
<li>What happens if I move to another state?</li>
<li>Can I do this myself, or do I need professional help?</li>
</ul>
<p>Our downloadable checklists address all of these questions and more.</p>

<h2>Get the Complete Checklist</h2>
<p>Download our comprehensive ${a.cat.toLowerCase()} checklist in PDF format. Designed to be easy to use, with checkboxes, space for notes, and clear instructions.</p>

<div class="cta-box">
<strong>📥 Download the ${a.cat} Checklist</strong>
Instant PDF download. No signup required. Family-friendly format.
<a href="/finalwishes-checklist/#products">Download Now →</a>
</div>

<div class="related">
<strong>Related planning guides:</strong>
<a href="/finalwishes-checklist/articles/estate-planning-checklist-guide.html">Estate Planning Checklist</a>
<a href="/finalwishes-checklist/articles/last-will-and-testament-complete.html">Last Will and Testament Guide</a>
<a href="/finalwishes-checklist/articles/power-of-attorney-types-complete.html">Power of Attorney Types</a>
<a href="/finalwishes-checklist/articles/digital-legacy-plan-complete.html">Digital Legacy Plan Guide</a>
</div>

<div class="disc">
<strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute legal or financial advice. Laws vary by jurisdiction. For estate planning, wills, trusts, and powers of attorney, consult a licensed attorney. FinalWishesChecklist.com is not a law firm, funeral home, or financial institution.
</div>
</body>
</html>`;
}

const dir = __dirname + '/articles';
batch.forEach(a => {
  fs.writeFileSync(dir + '/' + a.slug + '.html', genArticle(a), 'utf8');
  console.log('✅', a.slug);
});
console.log('\n✅ Batch 2 done. Total files:', fs.readdirSync(dir).filter(f=>f.endsWith('.html')).length);
