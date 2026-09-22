import type {
  Requirement,
  ServiceRecord,
  ServiceStep,
  SourceRecord,
} from '../types/civic.js';

export interface FeedbackMechanism {
  submissionLocation: string;
  processingSchedule: string;
  complaintRequirements: string;
  followUpPhone: string;
  externalHotlines: Array<{ label: string; value: string }>;
  source: SourceRecord;
  status: 'verified' | 'pending' | 'unverified';
}

export interface CharterOfficeContact {
  slug: string;
  name: string;
  address: string;
  telephone: string;
  telephoneNumbers: string[];
  source: SourceRecord;
  status: 'verified' | 'pending' | 'unverified';
}

interface CharterProcedureDefinition {
  page: number;
  endPage: number;
  title: string;
  category: string;
  description: string;
  office: string;
  classification: string;
  transactionTypes: string[];
  whoMayApply?: string;
  requirements: Requirement[];
  fees?: string;
  processingTime?: string;
  steps: ServiceStep[];
}

const procedureDefinitions: CharterProcedureDefinition[] = [
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      'The Tricycle Permit is issued by the Local Government Unit (LGU) to authorize the operation of tricycles for public transport within the designated routes of the municipality. This service ensures that tricycle operators comply with local traffic regulations, safety standards, and franchise requirements to promote safe, orderly, and efficient transportation for the public. The Ferry Boat Permit is granted by the LGU to allow individuals or entities to operate ferry boats for the transport of passengers, goods, or vehicles across the Cagayan River spanning the LGU’s jurisdiction.',
    endPage: 11,
    fees: 'PHP',
    office: 'Office of the Mayor',
    page: 10,
    processingTime: '15 minutes; 10 minutes; 5 minutes; 30 minutes',
    requirements: [
      { name: '(1) Copy of Latest Official Receipt' },
      { name: '(1) Copy of Certificate of Registration' },
      { name: '(1) Copy of Valid Driver’s License' },
      { name: '(1) Copy of Valid Franchise' },
      { name: '(1) Community Tax Certificate' },
      { name: '(1) Official Receipt' },
    ],
    steps: [
      {
        action: 'Proceed to the Office of the Mayor and present',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify the completeness of requirements None 15 minutes Administrative Aide I ￼ requirements 1.2. If the requirements are complete, the Permit is prepared and to be signed by the Mayor/ OIC/Acting Mayor',
        number: '1.1.',
        role: 'agency',
      },
      {
        action: 'Proceed to payment at the Municipal Treasurer’s Office.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Issue Official Receipt from the Municipal Treasurer’s Office Tricycle: PHP Application Fee for MTOP 200.00 Annual Franchise Fee',
        number: '2.',
        role: 'agency',
      },
      { action: '00 Mayor’s Permit', number: '200.', role: 'agency' },
      {
        action: '00 Application Fee for Amendment/ Renewal MTOP',
        number: '50.',
        role: 'agency',
      },
      { action: '00 Fare Adjustment Fee', number: '150.', role: 'agency' },
      {
        action: '00 Fee for dropping of franchise 150.00 Franchise Plate fee',
        number: '250.',
        role: 'agency',
      },
      { action: '00 Annual Sticker fee', number: '200.', role: 'agency' },
      { action: '00 Ferry: Filing fee', number: '50.', role: 'agency' },
      {
        action: '00 Franchise fee 1,000.00 Mayor’s Permit fee',
        number: '200.',
        role: 'agency',
      },
      { action: '00 Registration Plate', number: '200.', role: 'agency' },
      {
        action:
          '00 10 minutes Revenue Collection Clerk, Municipal Treasurer’s Office',
        number: '200.',
        role: 'agency',
      },
      {
        action: 'Receive the permit and sign in the receiving copy.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue the permit Registration Plate. None 5 minutes Administrative Aide I Fee shall be to accordance permit secured 30 minutes ￼',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF TRICYCLE PERMIT AND FERRY BOAT PERMIT',
    transactionTypes: ['G2C'],
    whoMayApply:
      'All qualified tricycle driver/operator and ferry boat operator within the municipality and neighboring towns with valid franchise to operate in the Municipality of Lal-lo.',
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      'Issued to individuals whose purpose is for solicitation, selling, conducting popularity contest, and other permits aside from business operation.',
    endPage: 14,
    fees: 'Php 1,000.00; Php 2,000.00; Php 3,000.00; Php 4,000.00; Php 5,000.00; ment shows Php; B. Bingo socials Php; matches Php; activities Php; roads/streets Php; 2. Dances Php; balls Php 500.00; Php1,500.00',
    office: 'Office of the Mayor',
    page: 12,
    processingTime: '5 minutes; 10 minutes; 30 minutes',
    requirements: [
      { name: 'Copy of approved Request Letter' },
      { name: 'Official Receipt' },
    ],
    steps: [
      {
        action:
          'Submit the letter addressed to the Mayor indicating the planned activity and its purpose requirement s requisite to the issuance of the service',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive evaluate request letter None 5 minutes Administrativ e Aide I/Records Officer I ￼',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Advise client to pay appropriate fees for the permit None 5 minutes',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'Proceed to payment at the Municipal Treasurer’s Office',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Issue Official Receipt. Conduct of Cockfighting A. Special Cockfights (Pintakasi) Php 1,000.00 A. Special Derby Assessment from Promoters of - Two-Cock Derby Php 2,000.00 Three-Cock Derby Php 3,000.00 Four-Cock Derby Php 4,000.00 Five-Cock Derby Php 5,000.00 Conduct Fund- raising Activities A. Concerts/entertain ment shows Php',
        number: '2.',
        role: 'agency',
      },
      { action: '00 B. Bingo socials Php', number: '500.', role: 'agency' },
      {
        action: '00 C. Sports exhibition matches Php',
        number: '500.',
        role: 'agency',
      },
      {
        action: '00 D. Other fund- raising/fund drive activities Php',
        number: '300.',
        role: 'agency',
      },
      {
        action: '00 Conduct of Group Activities',
        number: '100.',
        role: 'agency',
      },
      {
        action:
          'Conference, meetings, rallies and 5 minutes Revenue Collection Clerk Municipal Treasurer’s Office ￼ demonstration in outdoor, in parks, plazas, roads/streets Php',
        number: '1.',
        role: 'agency',
      },
      { action: '00', number: '500.', role: 'agency' },
      { action: 'Dances Php', number: '2.', role: 'agency' },
      { action: '00', number: '500.', role: 'agency' },
      {
        action: 'Coronations and balls Php 500.00',
        number: '3.',
        role: 'agency',
      },
      {
        action: 'Promotional sales Php 1,000.00',
        number: '4.',
        role: 'agency',
      },
      {
        action: 'Concerts/entertain ment shows Php1,500.00',
        number: '5.',
        role: 'agency',
      },
      { action: 'Other group activities Php', number: '6.', role: 'agency' },
      { action: '00', number: '500.', role: 'agency' },
      { action: 'Receive the Special Permit.', number: '3.', role: 'agency' },
      {
        action:
          'Prepare the permit and secure signature of the Mayor/OIC/ Acting Mayor None 10 minutes Administrativ e Aide I/Records Officer I',
        number: '3.1.',
        role: 'agency',
      },
      {
        action:
          'Record and release the permit to client. None 5 minutes Administrativ e Aide I/Records Officer I Fee shall be in accordance to activity to be conducted 30 minutes ￼',
        number: '3.2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF SPECIAL PERMIT',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Religious, civic, social and/or sports organizations, clubs, associations, federations or fraternities desiring to hold benefit shows, balls, programs, exhibitions, contests, bingo socials and other kind of fund-raising activities.',
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      'The Mayor’s Clearance is an official document issued by the Office of the Mayor certifying that the individual has no pending case, complaint, or violation of local laws and ordinances within the Local Government Unit. It is required for employment and other legal or official purposes.',
    endPage: 16,
    fees: 'PhP 150.00; Purposes Php; Php150.00; Total PhP 500.00 30 minutes',
    office: 'Office of the Mayor',
    page: 15,
    processingTime: '10 minutes; 5 minutes; 30 minutes',
    requirements: [
      { name: '(1) Community Tax Certificate' },
      { name: '(1) Original and Valid Barangay Clearance' },
      { name: '(1) Original and Valid Police Clearance' },
      { name: "(1) Original Municipal Trail Court /Prosecutor's Clearance" },
      { name: '(1) Official Receipt' },
    ],
    steps: [
      {
        action: 'Proceed to the Office of the Mayor and present requirement s',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify the completeness of requirements. None 10 minutes Administrative Aide I/Records Officer I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Prepare clearance to be signed by the Human Resource Management Officer/Executive Assistant/Youth Development Officer/Disability Affairs Officer and the None 10 minutes Administrative Aide I/Records Officer I Human Resource Management Officer/Executi ve Assistant/Yout h Development ￼ Mayor/OIC/Acting Mayor. Officer/Disabilit y Affairs Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Procee d to paymen t at the Treasur er’s Office Issue Official Receipt Mayor’s Clearance: Local Purposes PhP 150.00 VISA/Abroad Purposes Php',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '00 Certified Photocopy of Certification issued Php150.00 5 minutes Revenue Collection Clerk Municipal Treasurer’s Office',
        number: '200.',
        role: 'agency',
      },
      {
        action:
          'Receive the Mayor’s Clearance Issue the clearance to the client and sign at the receiving copy. None 5 minutes Administrative Aide I/Records Officer I,',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF MAYOR’S CLEARANCE',
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply: 'Residents of the Municipality of Lal-lo',
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      'The Mayor’s Clearance is an official document issued by the Office of the Mayor certifying that the individual has no pending case, complaint, or violation of local laws and ordinances within the Local Government Unit. It is required for employment and other legal or official purposes.',
    endPage: 18,
    fees: 'Php 500.00 5 minutes; PhP 500.00 17 minutes',
    office: 'Office of the Mayor',
    page: 17,
    processingTime: '3 minutes; 2 minutes; 5 minutes; 17 minutes',
    requirements: [
      { name: 'Approved Request Letter' },
      { name: 'Official Receipt' },
    ],
    steps: [
      {
        action: 'Present approved request letter to the PLEB Secretary',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Prepare clearance to be signed by the PLEB Chairperson. None 3 minutes PLEB Secretary',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Instruct client to proceed for payment at the Municipal Treasurer’s Office None 2 minutes PLEB Secretary',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'Proceed to payment at the Treasurer’s Office',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '1 Issue Official Receipt PLEB Clearance Php 500.00 5 minutes Revenue Collection Clerk Municipal Treasurer’s Office ￼',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '2 Prepare clearance to be signed by the PLEB Chairperson None 5 minutes',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the PLEB Clearance Issue the clearance to the client and sign at the receiving copy. None 2 minutes PLEB Secretary PhP 500.00 17 minutes ￼',
        number: '3.',
        role: 'agency',
      },
    ],
    title: "ISSUANCE OF PEOPLE'S LAW ENFORCEMENT BOARD (PLEB) CLEARANCE",
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply: 'Residents of the Municipality of Lal-lo',
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      "A document that supports attestation to an individual's character, capabilities, and residency to assist them in achieving specific goals, such as securing employment or obtaining assistance.",
    endPage: 19,
    office: 'Office of the Mayor',
    page: 19,
    processingTime: '15 minutes; 10 minutes; 5 minutes; 30 minutes',
    requirements: [
      { name: 'Approved Request Letter' },
      { name: 'Resume/Personal Data Sheet' },
    ],
    steps: [
      {
        action:
          'Proceed to the Office of the Mayor present requirements to the Office of the Mayor',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Interview the applicant and verify completeness of requirements. None 15 minutes Administrative Aide I/Records Officer I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Prepare recommendation to be signed by the Mayor/OIC/Acting Mayor. None 10 minutes',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'Receive the Recommendation letter.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Issue the Recommendation Letter to the client None 5 minutes Administrative Aide I/Records Officer I',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF RECOMMENDATION LETTER',
    transactionTypes: ['G2C'],
    whoMayApply: 'Residents of the Municipality of Lal-lo',
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      'A formal document issued by the office to recommend, certify, or support an individual, organization, or request for a specific purpose, such as employment, assistance, accreditation, or official transactions.',
    endPage: 21,
    office: 'Office of the Mayor',
    page: 20,
    processingTime: '3 minutes; 10 minutes; 2 minutes; 15 minutes',
    requirements: [{ name: 'Copy of document to be endorsed.' }],
    steps: [
      {
        action: 'Submit document/s for indorsement to the Office of the Mayor',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge submitted documents None 3 minutes Administrative Aide I/Records Officer I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Prepare the Indorsement letter and will be signed by the Mayor None 10 minutes Administrative Aide I/Records Officer I',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'Receive the Indorsement letter',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Release Indorsement letter None 2 minutes Administrative Aide I/Records Officer I',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF INDORSEMENT LETTER',
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply:
      'Offices of the Local Government of Lal-lo and other government entities.',
  },
  {
    category: 'Human resources',
    classification: 'Simple',
    description:
      'This service is available to all municipal officials, employees and job hires which serves as proof of evidence to employment with LGU-Lal-lo for whatever legal purpose serves it may serve them under the law.',
    endPage: 22,
    office: 'Office of the Mayor-Human Resource Management Office',
    page: 22,
    processingTime: '3 minutes; 10 minutes; 2 minutes; 15 minutes',
    requirements: [
      {
        name: 'Requisition slip form (both active and separated LGU Personnel)',
      },
    ],
    steps: [
      {
        action:
          'Fill up requisition slip form for Certificate of Employment. Note: In case that electives and availing personnel whose status of employment is permanent, coterminous and casual, verification shall be made from available records (201 files) at the HRMO.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge submitted form None 3 minutes Administrative Aide I/Records Officer I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Prepare the certificate of employment and secure signature of the Human Resource Management Officer None 10 minutes Administrative Aide I/Records Officer I Human Resource Management Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'Receive the Certificate of Employment',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Release Certificate of Employment None 2 minutes Administrative Aide I/Records Officer I',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTFICATE OF EMPLOYMENT',
    transactionTypes: ['G2C'],
    whoMayApply:
      'Municipal officials, employees and job hires of the Local Government Unit of Lal-lo including those who were separated in the LGU.',
  },
  {
    category: 'Human resources',
    classification: 'Complex',
    description:
      'The Local Government Unit (LGU) facilitates the deployment of on-the-job trainees and student interns from partner schools, colleges, and universities to various offices within the municipality. This program provides students with practical exposure to government operations, enhances their skills and competencies through supervised work assignments, and instills values of discipline, responsibility, and professionalism.',
    endPage: 26,
    office: 'Office of the Mayor-Human Resource Management Office',
    page: 23,
    processingTime:
      '3 minutes; 5 days; 5 minutes; 2 minutes; 1 hour; 10 minutes; 2 hours; 23 minutes',
    requirements: [
      { name: 'Letter of intent' },
      { name: 'Memorandum of Agreement' },
    ],
    steps: [
      {
        action: 'Present letter intent and MOA at the Office of the Mayor.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive submitted documents for approval and review. None 3 minutes Administrative Aide I/Records Officer I, Office of the Mayor',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Inform the educational institution of the action taken by the LCE on the letter intent None 3 minutes Administrative Aide I/Records Officer / Human Resource Management Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'In case revision is deemed necessary on the MOA, the school shall be informed and comply with the None 5 days Administrative Aide I/Records Officer / Human Resource Management Officer Educational Institution ￼ needed action. concerned.',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          '4. Upon approval and review of the MOA, coordination with the educational institution for the schedule of internship None 5 minutes Administrative Aide I/Records Officer / Human Resource Management Officer',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Submit signed and finalized MOA at the Office of the Mayor',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive finalized MOA None 2 minutes Administrative Aide I/Records Officer / Human Resource Management Officer',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Interns present themselves at the LGU for orientation',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Conduct orientation to interns None 1 hour Administrative Aide I/Records Officer / Human Resource Management Officer',
        number: '3.1.',
        role: 'agency',
      },
      {
        action:
          'Prepare the Memorandum on Deployment and release to concerned offices and copy furnish to concerned school. None 10 minutes Administrative Aide I/Records Officer Local Chief Executive',
        number: '3.2.',
        role: 'agency',
      },
      {
        action:
          'Endorse intern/s to the Department Head/Officer in Charge/Section None 1 hour Administrative Aide I/Records Officer / Human Resource Management ￼ Head of their assigned office. Officer',
        number: '3.3.',
        role: 'agency',
      },
    ],
    title: 'DEPLOYMENT OF ON-THE-JOB TRAINEES/STUDENT INTERN',
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply: 'Schools, colleges, and universities.',
  },
  {
    category: 'Youth development',
    classification: 'Simple',
    description:
      'For youth organizations and youth-serving organizations who wish to register with, and be accredited by, the National Youth Commission',
    endPage: 28,
    fees: 'None',
    office: 'Office of the Mayor-Local Youth Development Office',
    page: 27,
    processingTime: '10 minutes; 20 minutes; 1 hour',
    requirements: [
      { name: 'Duly accomplished Registration Form' },
      { name: 'Duly accomplished directory of officers and advisers' },
      { name: 'Duly accomplished list of members in good standing' },
      { name: 'Copy of organizational constitution and by-laws' },
      { name: 'Certification from appropriate authority:' },
    ],
    steps: [
      {
        action:
          'Log-in to logbook, present requirements to the Office of the Mayor.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge presented requirements. None 10 minutes Youth Development Officer I/ Administrative Aide I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Review the completeness, in substance and in form, of the requirements submitted. 20 minutes Youth Development Officer I/ Administrative Aide I',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Upload forms in the Youth Organization Registration 20 minutes ￼ Program Portal for verification of National Youth Commission.',
        number: '1.3.',
        role: 'agency',
      },
      { action: 'Receive the confirmation slip', number: '2.', role: 'agency' },
      {
        action:
          'Release the confirmation slip and copy of the checklist of submitted requirements. None 10 minutes Youth Development Officer I/ Administrative Aide',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'APPLICATION TO THE YOUTH ORGANIZATION REGISTRATION PROGRAM',
    transactionTypes: ['G2C'],
    whoMayApply: 'All eligible applicants.',
  },
  {
    category: 'Youth development',
    classification: 'Simple',
    description:
      'A prerequisite prior to the taking of oath of office among newly elected/appointed Sangguniang Kabataan council members.',
    endPage: 31,
    office: 'Office of the Mayor-Local Youth Development Office',
    page: 29,
    processingTime: '10 minutes; 5 hours; 20 minutes',
    requirements: [
      { name: 'Certificate of proclamation (from COMELEC)' },
      { name: 'Proof of Appointment (for Secretary/Treasurer)' },
      {
        name: 'Valid Identification Card - National I.D - Driver’s License - Passport I.D',
      },
    ],
    steps: [
      {
        action:
          'Log-in to logbook, present requirements to the Office of the Mayor.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge presented requirements. None 10 minutes Youth Development Officer I/ Administrative Aide I',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Undergo SK Mandatory Training (Must complete all the three modules)',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Training manager will facilitate the training. None 5 hours Municipal Social Welfare and Development Officer Youth Development Officer I ￼',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Receive the certificate of completion',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Release the signed certificate of completion None 10 minutes Youth Development Officer I/ Administrative Aide',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF SANGGUNIANG KABATAAN MANDATORY TRAINING CERTIFICATE',
    transactionTypes: ['G2C'],
    whoMayApply:
      'Newly elected or appointed SK Chairperson, Kagawad, Secretary, or Treasurer.',
  },
  {
    category: 'Population services',
    classification: 'Simple',
    description:
      'Issued to contracting parties/would be couples of legal ages who want to marry as required under Presidential Decree 965 S. 1976 and Article 16 of the Family Code of the Philippines.',
    endPage: 37,
    fees: 'Php; TOTAL Php500.00 30 minutes',
    office: 'Office of the Mayor-Municipal Population Office',
    page: 32,
    processingTime:
      '5 minutes; 15 minutes; 10 minutes; 4 hours; 35 minutes; 3 minutes; 1 minute; 30 minutes',
    requirements: [
      { name: 'Official receipt of payment of Certificate of No Marriage' },
      { name: 'Copy of Certificate of No Marriage' },
    ],
    steps: [
      {
        action:
          'Accomplish Pre- Marriage Counseling Application Form and present documentary requirements.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive & review completeness of requirements. None 5 minutes Municipal Population Officer- Designate',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'If complete, prepare pre- marriage certificate application form None 5 minutes Municipal Population Officer- Designate',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'If age application below 25: Filing up of Marriage Expectation Inventory Exam',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Administer Marriage Expectation Inventory Exam to client/s. None 15 minutes Municipal Population Officer- Designate ￼',
        number: '2.1.',
        role: 'agency',
      },
      {
        action:
          'Receive exam sheet interview/ profiling using Responsible parenthood and Family Planning Form 1 None 10 minutes Municipal Population Officer- Designate',
        number: '2.2.',
        role: 'agency',
      },
      {
        action: 'Client attend the Pre Marriage- Orientation and counseling',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Conduct Pre Marriage and Orientation counseling None 4 hours Pre Marriage and Orientation & Counseling (PMOC) Team',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'APPLICATION FOR PRE-MARRIAGE ORIENTATION & COUNSELING',
    transactionTypes: ['G2C'],
    whoMayApply:
      'All interested applicants residing in the municipality with intent to marry.',
  },
  {
    category: 'Disability affairs',
    classification: 'Simple',
    description:
      'In accordance with Republic Act No. 9442 and related CSC/DSWD guidelines, this service ensures that persons with disabilities are officially recognized and able to avail of benefits, privileges, and discounts mandated by law.',
    endPage: 39,
    office: 'Office of the Mayor-Disability Affairs Office',
    page: 38,
    processingTime: '5 minutes; 20 minutes; 30 minutes',
    requirements: [
      { name: 'Certificate of Disability and /or Medical Certificate' },
      { name: 'Barangay Certificate as to Applicants Residency' },
    ],
    steps: [
      {
        action: 'Register in the logbook provided by the Office.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Present logbook and interview client None 5 minutes Disability Affairs Officer I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action: 'Prepare ID None 20 minutes Disability Affairs Officer I',
        number: '1.2.',
        role: 'agency',
      },
      { action: 'Receive ID & Booklet', number: '2.', role: 'agency' },
      {
        action:
          'Release booklet & ID None 5 minutes Disability Affairs Officer I',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF PERSON WITH DISABILITY (PWD) ID AND BOOKLETS',
    transactionTypes: ['G2C'],
    whoMayApply:
      'Applicants with certified medical documentation confirming their disability.',
  },
  {
    category: 'Public information',
    classification: 'Simple/External',
    description:
      'The Information Office through media coverage services documents and publicizes significant events, supports media coordination, and promotes public awareness to keep citizens well-informed and engaged.',
    endPage: 41,
    office: 'Mayor’s Office– Information Office',
    page: 40,
    processingTime: '10 minutes; 5 minutes; 35 minutes',
    requirements: [{ name: 'Request Letter' }],
    steps: [
      {
        action:
          'Present request letter at the Office of the Mayor and secure approval for media coverage.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge request None 10 minutes Administrative Aide I Office of the Mayor a. Upon approval of the request, client shall be informed of the action taken by the LCE and forward the same at the Information Office. None 10 minutes',
        number: '1.1.',
        role: 'agency',
      },
      {
        action: 'Present details about the desired activity to cover.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Verification of availability and schedule of Media Team None 10 minutes Administrative Aide I/Information Officer III',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Wait for the confirmation of request and availment of the service as per schedule.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Schedule shall be finalized and posted in the calendar of activities. None 5 minutes Administrative Aide I/Information Officer III',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'MEDIA COVERAGE',
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply: 'All offices in the LGU',
  },
  {
    category: 'Public information',
    classification: 'Simple',
    description:
      'The Information Office through media coverage services documents and publicizes significant events, supports media coordination, and promotes public awareness to keep citizens well-informed and engaged.',
    endPage: 43,
    fees: 'None',
    office: 'Office of the Mayor– Information Office',
    page: 42,
    processingTime: '15 minutes; 5 minutes; 20 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Scan QR Code provided in each department and fill out the needed information',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Check the system. None 15 minutes Requesting Client',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Wait for the notification of the approval of request',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Schedule the request and identify assigned staff to cover. Notify the clients on requests’ approval and disapproval. None 5 minutes Administrative Aide I/Information Officer III',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'MEDIA COVERAGE FOR LGU LAL-LO PROGRAMS',
    transactionTypes: ['G2G'],
    whoMayApply: 'All Offices in the LGU',
  },
  {
    category: 'Business permits',
    classification: 'Simple',
    description:
      'The Mayor’s Permit to Operate Business allows businesses the privilege of conducting their business within the jurisdiction of the municipality. All businesses are required to obtain a Mayor’s Permit before they engage in any business within the municipality.',
    endPage: 46,
    fees: 'None',
    office: 'Office of the Mayor – Business Permits and Licensing Section',
    page: 44,
    processingTime: '1 hours; 30 minutes; 2 days; 1 hour; 4 hours; 7 hours',
    requirements: [
      {
        name: 'Duly accomplished unified application form (UAF)—2 original Window 1, Municipal Treasury, Ground Floor, Lal-lo Municipal Hall',
      },
      {
        name: 'Proof of Business Registration • For sole proprietorship: DTI Registration—1 photocopy • For corporation/partnership: Articles of Incorporation—1 photocopy • For cooperative: CDA Registration—1 photocopy Department of Trade and Industry (DTI) Securities and Exchange Commission (SEC) Cooperative Development Authority (CDA)',
      },
      {
        name: 'Proof of right of applicant to use location as business address • If owned, proof of ownership (Transfer Certificate of Title (TCT) or Tax Declaration)—1 photocopy • If not owned, Contract of Lease, Memorandum of Agreement, or Owner’s Consent—1 photocopy Property owner for the TCT or at the Municipal Assessor’s Office for the Tax Declaration Lessor-client',
      },
      {
        name: 'Fire Safety Inspection Certificate (FSIC) for occupancy valid in the last 9 months—1 photocopy Bureau of Fire Protection – Lal-lo Fire Station',
      },
      {
        name: 'Additional documentary requirements for other required clearances, permits, authorizations and certifications secured from national government agencies in compliance to certain laws—1 photocopy Please see “Annex A” for the list of additional requirements to certain line of businesses',
      },
      {
        name: 'Authorization letter and valid identification card of the business owner—1 photocopy each Business owner ￼',
      },
    ],
    steps: [
      {
        action:
          'File and submit duly accomplished unified application form with the complete requirements',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1 Verify and evaluate submitted documents: If application is deemed eligible and required documents are complete: None 1 hours BPLO- Designate/BPLO Staff',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '2 Encode pertinent data in the system and verify and endorse the application None 30 minutes BPLO Staff',
        number: '1.',
        role: 'agency',
      },
      {
        action: '3 Regulatory officers endorse or decline the application',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'If endorsed, approve in the system',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          '2 If declined, give reason for declining None 2 days Zoning Officer, Building Official, Sanitary Inspector, and MENRO',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          'Treasurer will review and finalize the initial assessment of taxes, fees and charges None 1 hour Municipal Treasurer/Local Treasury Operations Officer II',
        number: '1.4.',
        role: 'agency',
      },
      {
        action:
          'Print the final version of the UAF and tax order of payment and release it to the applicant If applicant is deemed ineligible, the applicant shall be given a notice of deficiency for his compliance. None 30 minutes BPLO-Designate BPLO Staff BPLO-Designate ￼',
        number: '1.5.',
        role: 'agency',
      },
      {
        action: 'Pay the assessed taxes, fees and charges',
        number: '5.',
        role: 'agency',
      },
      {
        action:
          'Receive payment and issue official receipt/s Please refer to “Annex B” for the list of taxes, fees and charges indicated in the (TOP) that is based on the 2023 Revised Revenue Code of the Municipality of Lal-lo and other pertinent laws and ordinances 30 minutes Revenue Collection Clerk',
        number: '6.',
        role: 'agency',
      },
      {
        action:
          'Receive the Mayor’s Permit, business registration plate and/or sticker and official receipt/s',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue the Mayor’s Permit together with the business registration plate and/or sticker, other permits, clearances and certifications None 4 hours BPLO Staff/BPLO- Designate',
        number: '3.',
        role: 'agency',
      },
    ],
    title:
      'ISSUANCE OF MAYOR’S PERMIT TO OPERATE BUSINESS NEW APPLICATION (ON-SITE)',
    transactionTypes: ['G2B'],
    whoMayApply: 'Business owners or his duly authorized representative',
  },
  {
    category: 'Business permits',
    classification: 'Simple',
    description:
      'The Mayor’s Permit to Operate Business allows businesses the privilege of conducting their business within the jurisdiction of the municipality. All businesses are required to obtain a Mayor’s Permit before they engage in any business within the municipality.',
    endPage: 49,
    fees: 'None',
    office: 'Office of the Mayor – Business Permits and Licensing Section',
    page: 47,
    processingTime: '1 hour; 30 minutes; 5 hours; 4 hours; 12 hours',
    requirements: [
      {
        name: 'Duly accomplished unified application form (UAF)—2 original Window 1, Municipal Treasury, Ground Floor, Lal-lo Municipal Hall',
      },
      {
        name: 'Proof of Annual Gross Receipts any of the following: • Audited financial statements (AFS) or unaudited financial statement for those who are not required to file AFS with the Bureau of Internal Revenue (BIR) • Sworn declaration of gross sales or receipts • Income tax return Business owner',
      },
      {
        name: 'Authorization letter and valid identification card of the business owner—1 photocopy each Business owner',
      },
    ],
    steps: [
      {
        action:
          'File and submit duly accomplished unified application form with the complete requirements',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify and evaluate submitted documents: If application is deemed eligible and required documents are complete: None 1 hour BPLO- Designate/BPLO Staff ￼',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          '2 Encode/edit pertinent data in the system and verify and endorse the application None 30 minutes BPLO Staff',
        number: '1.',
        role: 'agency',
      },
      {
        action: '3 Endorse or decline the application',
        number: '1.',
        role: 'agency',
      },
      {
        action: '1. If endorsed, approve in the system',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          '2 If declined, give reason for declining None 5 hours Zoning Officer, Building Official, Sanitary Inspector, and MENRO',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          '4 Treasurer will review and finalize the initial assessment of taxes, fees and charges None 1 hour Municipal Treasurer/Local Treasury Operations Officer II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Print the final version of the UAF and tax order of payment and release it to the applicant If applicant is deemed ineligible, the applicant shall be given a notice of deficiency for his compliance. None 30 minutes BPLO- Designate BPLO Staff BPLO- Designate',
        number: '1.5.',
        role: 'agency',
      },
      {
        action: 'Pay the assessed taxes, fees and charges',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive payment and issue official receipt/s Please refer to “Annex B” for the list of taxes, fees and charges indicated in the (TOP) that is based on the 2023 Revised Revenue Code of the Municipality of Lal-lo and other pertinent 30 minutes Revenue Collection Clerk ￼ laws and ordinances',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the Mayor’s Permit, business registration plate and/or sticker and official receipt/s',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue the Mayor’s Permit together with the business registration plate and/or sticker, other permits, clearances and certifications None 4 hours BPLO Staff/BPLO- Designate',
        number: '3.',
        role: 'agency',
      },
    ],
    title:
      'ISSUANCE OF MAYOR’S PERMIT TO OPERATE BUSINESS RENEWAL APPLICATION (ON-SITE)',
    transactionTypes: ['G2B'],
    whoMayApply: 'Business owners or his duly authorized representative',
  },
  {
    category: 'Business permits',
    classification: 'Simple',
    description:
      'The Mayor’s Permit to Operate Business allows businesses the privilege of conducting their business within the jurisdiction of the municipality. All businesses are required to obtain a Mayor’s Permit before they engage in any business within the municipality.',
    endPage: 52,
    office: 'Office of the Mayor – Business Permits and Licensing Section',
    page: 50,
    processingTime: '1 hours; 30 minutes; 2 days; 4 hours; 7 hours',
    requirements: [
      {
        name: 'Proof of Business Registration • For sole proprietorship: DTI Registration—to be scanned and uploaded • For corporation/partnership: Articles of Incorporation—to be scanned and uploaded • For cooperative: CDA Registration—to be scanned and uploaded Department of Trade and Industry (DTI) or apply online at https://bnrs.dti.gov.ph/registration Securities and Exchange Commission (SEC) or apply online at https://esparc.sec.gov.ph/application Cooperative Development Authority (CDA) or apply online at https://cs.cda.gov.ph/',
      },
      {
        name: 'Proof of right of applicant to use location as business address • If owned, proof of ownership (Transfer Certificate of Title (TCT) or Tax Declaration)—to be scanned and uploaded • If not owned, Contract of Lease, Memorandum of Agreement, or Owner’s Consent—to be scanned and uploaded Property owner for the TCT or at the Municipal Assessor’s Office for the Tax Declaration Lessor-client',
      },
      {
        name: 'Fire Safety Inspection Certificate (FSIC) for occupancy valid in the last 9 months—to be scanned and uploaded Bureau of Fire Protection-Lal-lo Fire Station or apply online at https://fsis.e-bfp.com/',
      },
      {
        name: 'Additional documentary requirements for other required clearances, permits, authorizations and certifications secured from national government agencies in compliance to certain laws—to be scanned and uploaded for each applicable Please see “Annex A” for the list of additional requirements to certain line of businesses ￼ document',
      },
    ],
    steps: [
      {
        action:
          'Apply online at https://bpbc.ibpls.com /lallocagayan or via eGovPH mobile app that you can download at Google Play Store for android, the Apple App Store for iOS or Huawei AppGallery for Huawei devices.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify and evaluate uploaded documents: If application is deemed eligible and required documents are complete: None 1 hours BPLO- Designate/BPLO Staff',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Encode pertinent data in the system and verify and endorse the application None 30 minutes BPLO Staff',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'Endorse or decline the application.',
        number: '1.3.',
        role: 'agency',
      },
      {
        action: '1. If endorsed, approve in the system',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          '2 If declined, give reason for declining None 2 days Zoning Officer, Building Official, Sanitary Inspector, and MENRO',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          '4 Treasurer will review and finalize the initial assessment of taxes, fees and charges None 1 hours Municipal Treasurer/Local Treasury Operations Officer II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '3 Email the tax order of payment to the applicant If applicant is deemed ineligible, the applicant shall be given a notice of deficiency for his compliance None 30 minutes BPLO-Designate BPLO Staff BPLO-Designate',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Pay the assessed taxes, fees and',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Validate online payment and prepare Please refer to “Annex B” for the list of taxes, fees 30 minutes Revenue Collection Clerk ￼ charges. You have the option to pay over the counter at Window 2 at the Municipal Treasury, Lal-lo Municipal Hall or you can pay online via Land Bank of the Philippines Link.BizPortal Payment Channel at https://www.lbp- eservices.com official receipt/s and charges indicated in the (TOP) that is based on the 2023 Revised Revenue Code of the Municipality of Lal-lo and other pertinent laws and ordinances',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the Mayor’s Permit, business registration plate and/or sticker, other permits, clearances, and certifications at your business address or claim it at the Mayor’s Office at the Municipal Hall',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Release or deliver the Mayor’s Permit together with the business registration plate and/or sticker, other permits, clearances, and certifications depending on the preference of the client. None 4 hours BPLO Staff/BPLO- Designate',
        number: '3.',
        role: 'agency',
      },
    ],
    title:
      'ISSUANCE OF MAYOR’S PERMIT TO OPERATE BUSINESS NEW APPLICATION (ONLINE)',
    transactionTypes: ['G2B'],
    whoMayApply: 'Business owners or his duly authorized representative',
  },
  {
    category: 'Business permits',
    classification: 'Simple',
    description:
      'The Mayor’s Permit to Operate Business allows businesses the privilege of conducting their business within the jurisdiction of the municipality. All businesses are required to obtain a Mayor’s Permit before they engage in any business within the municipality.',
    endPage: 55,
    office: 'Office of the Mayor – Business Permits and Licensing Section',
    page: 53,
    processingTime: '1 hours; 30 minutes; 5 hours; 4 hours; 12 hours',
    requirements: [
      {
        name: 'Proof of Annual Gross Receipts such as: • Audited financial statements (AFS) or unaudited financial statement for those who are not required file AFS with the Bureau of Internal Revenue (BIR) • Sworn declaration of gross sales or receipts • Income tax return Business owner',
      },
    ],
    steps: [
      {
        action:
          'Apply online at https://bpbc.ibpls.com/lallocagayan or via eGovPH mobile app that you can download at Google Play Store for android, the Apple App Store for iOS or Huawei AppGallery for Huawei devices.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1 Verify and evaluate uploaded documents: If application is deemed eligible and required documents are complete: None 1 hours BPLO- Designate/BPLO Staff',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '2 Encode pertinent data in the system and verify and endorse the application None 30 minutes BPLO Staff',
        number: '1.',
        role: 'agency',
      },
      {
        action: '3 Endorse or decline the application',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1. If endorsed, approve in None 5 hours Zoning Officer, Building Official, Sanitary Inspector, and MENRO ￼ the system',
        number: '1.3.',
        role: 'agency',
      },
      {
        action: '2 If declined, give reason for declining',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          '4 Treasurer will review and finalize the initial assessment of taxes, fees and charges None 1 hours Municipal Treasurer/Local Treasury Operations Officer II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Email the tax order of payment to the applicant If applicant is deemed ineligible, the applicant shall be given a notice of deficiency for his compliance None 30 minutes BPLO- Designate BPLO Staff BPLO- Designate',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Pay the assessed taxes, fees and charges. You have the option to pay over the counter at Window 2 at the Municipal Treasury, Lal-lo Municipal Hall or you can pay online via Land Bank of the Philippines Link.BizPortal Payment Channel at https://www.lbp-eservices.com',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Validate online payment and prepare official receipt/s Please refer to “Annex B” for the list of taxes, fees and charges indicated in the (TOP) that is based on the 2023 Revised Revenue Code of the Municipality of Lal-lo and other pertinent laws and ordinances 30 minutes Revenue Collection Clerk',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the Mayor’s Permit, business registration plate and/or sticker, other permits, clearances and certifications at your business address or claim it at the Mayor’s Office at the Municipal Hall',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Release or deliver the Mayor’s Permit together with the business registration plate and/or sticker, other permits, None 4 hours BPLO Staff/BPLO- Designate ￼ clearances and certifications depending on the preference of the client',
        number: '3.',
        role: 'agency',
      },
    ],
    title:
      'ISSUANCE OF MAYOR’S PERMIT TO OPERATE BUSINESS RENEWAL APPLICATION (ONLINE)',
    transactionTypes: ['G2B'],
    whoMayApply: 'Business owners or his duly authorized representative',
  },
  {
    category: 'Business permits',
    classification: 'Simple',
    description:
      'Upon termination of the business submit a sworn statement of the gross sales or receipt for the current calendar year. Any tax due shall first be paid before any business can be considered finally closed.',
    endPage: 87,
    fees: 'Php230.00 with DST; Less than 10,000.00 Php 214.00; Less than 1,000.00 Php 23.00; Php400,000.00 or less 2.06%; More than Php400,000.00 1.03%; not exceeding Four Hundred Thousand Pesos (Php400,000.00) while the rate of one and three; Hundred Thousand Pesos (Php400,000.00).; exceed Thirty Thousand (Php30,000.00) Pesos, the barangay concerned shall have the exclusive; Php; (Php1,500.00) Pesos before participating in any bidding activities to be undertaken within the; Less than 5,000.00 Php 33.00; 1. Truck, closed van, jeep or any other similar motor vehicles Php 3,000.00; Air-conditioned buses Php 2,200.00 per unit; Wholesale dealer in foreign liquor Php; Wholesale dealer in fermented liquor Php 660.00; Cottage Php60,000.00 and below 1; Micro Over Php60,000.00 to Php150,000.00 2-9; Small Over Php150,000.00 to Php300,000.00 10-99; Medium Over Php300,000.00 to Php500,000.00 100-199; Large Over Php500,000.00 and above 200 and above; Micro Php 700.00; Cottage Php 400.00; Rural and Cooperative Banks Php 2,700.00; Small Php 2,700.00; Micro Php 2,000.00; Micro Php 500.00; Micro Php 300.00; Cottage Php 100.00; Rural and Cooperative Banks Php 500.00; Small Php 500.00; Not over one (1) meter Php 100.00; charge of Two Hundred Pesos (Php200.00) for each instrument shall be collected.; Php 100.00; 500 to 2,000 liters Php 1,000.00; Less than 1,000 kilograms Php 1,000.00; 2HP and below Php 150.00; Php100,000.00 and below Php288.00; Over Php100,000.00 to Php200,000.00 Php576.00; Over Php200,000.00 Php720.00 + 1/10 of 1% of cost in excess of; Php200,000.00; Php500,000.00 and below Php1,440.00; Over Php500,000.00 to Php2,000,000.00 Php2,160.00; Over Php2,000,000.00 Php3,600.00 + 1/10 of 1% of cost in excess of; Php2,000,000.00 regardless of the number of; Php2,000,000.00 and below Php3,600.00; Php2,000,000.00 regardless of the number of doors; Below Php2,000,000.00 Php2,880.00; Over Php2,000,000.00 Php2,880.00 + 1/10 of 1% of cost in excess of; Php2,000,000.00; Below Php100,000.00 Php1,440.00; Over Php100,000.00 to Php500,000.00 Php2,160.00; Over Php500,000.00 to Php1,000,000.00 Php2,880.00; Over Php1,000,000.00 to Php2,000,000.00 Php4,320.00; Over Php2,000,000.00 Php7,200.00 + 1/10 of 1% of cost in excess of; Below Php2,000,000.00 Php7,200.00; Processing Fee Php360/ha. or a fraction thereof; Inspection Fee * Php1,500/ha. regardless of density; Processing Fee Php2,880/ha. or a fraction thereof; content Php3.00/sq.m.; Processing Fee Php2,880.00; Processing Fee Php216.00/saleable lot; component Php14.40/sq.m.; Inspection Fee * Php1,500.00/ha. regardless of density; Certification Fee Php216.00; Residential Php17.30 sq.m. of saleable area; Commercial Php36/sq.m. of saleable area; Inspection Fee Php1,500/ha.; Processing Fee Php504.00; development) Php17.30/sq.m.; Inspection Fee Php1,500/floor; Inspection Fee Php1,500.00/ha. regardless of density; Socialized Housing Php90/ha.; Economic Housing Php216/ha.; Socialized Housing Php1,500/ha.; Economic Housing Php1,500/ha.; Socialized Housing Php600/ha.; Economic Housing Php1,440/ha.; Building Permit (floor area of housing unit) Php7.20/sq.m.; Socialized Housing Php420; Economic Housing Php720; Socialized Housing Php24/saleable lot; Economic Housing Php72/saleable lot; component Php3.00/sq.m.; Economic Housing Php504; Socialized Housing Php180; Economic Housing Php216; Socialized Housing Php6.00/ha.; Economic Housing Php7.20/ha.; Socialized Housing Php1,500.00/ha.; Economic Housing Php1,500.00/ha.; a. Preliminary Approval and Locational Clearance Php720.00; Total Land Area Php7.20/sq.m.; No. of Floors Php144/floor; Building Areas Php5.80/sq.m. of GFA; 2. Certificate of Registration Php720; Residential Php7.20/sq.m. of saleable area; Commercial Php10.65/sq.m. of saleable area; Processing Fee Php3.00/sq.m.; Php1,500/floor; Inspection Fee Php1,500.00/floor; Processing Fee Php432/ha.; Processing Fee Php720/ha.; 2. Certificate of Registration Php2,880; Processing Fee Php504; Php14.40/sq.m.; Certification Fee Php216; Industrial Php504; Commercial Php720; Processing Fee Php288/ha.; Processing Fee Php1,440/ha.; Processing Fee Php720/lot; Memorial Project Php720/ha.; Cemeteries Php288/ha.; Columbarium Php3,600/ha.; Memorial Project Php1,500/ha.; Cemeteries Php1,500/ha.; Columbarium Php1,500/ha.; Memorial Project Php3.00/ha.; Cemeteries Php1.50/ha.; Columbarium Php7.20/ha.; Php3.00/floor; Php23.05/sq.m. of GFA; Memorial Project Php72/2.5sq.m.; - Apartment Type Php28.80/unit; Cemeteries Php28.80/tomb; Columbarium Php72/vault; Columbarium Php1,500/floor; Memorial Project Php1,440; Cemeteries Php720/ha.; Columbarium Php5.80/sq.m. of GFA; Cemeteries Php7,500/ha.; 1. Advertisement Approval Php720; 2. Cancellation/ Reduction of Performance Bond Php2,880; 3. Clearance to Mortgage Php1,440; 4. Lifting of Cease-and-Desist Order Php2,880; Php1,440; 6. Voluntary Cancellation of CRLS Php1,440; 1. Zoning Certifications Php720/ha.; 3. Certification of New Rights/Sales Php216; 4. Certificate of Registration (Form) Php216; Php216/unit; a. Availability of records/ public request Php288; b. Certificate of no record on file Php288; c. Certification of with or without CRLS Php288; Document of five (5) pages or less Php43.20; Every additional page Php4.40; e. Photocopy of documents Php3.00; f. Other not listed above Php216; 1. Dealers/Brokers Php720; 2. Salesman/Agent Php288; Articles of Incorporation Php940 Php780; By-Laws Php940 Php780; 2. Stamping of Books Php50/book; Articles of Incorporation Php720; By-Laws Php720; 4. Dissolution of Homeowners Association Php720; 5. Certification of the new set of Officers Php504; 6. Other Certification Php216; 7. Research Fee Php50/docket; 1. Zoning Certificate Fee Php200.00; a. Right of Way Certificate Fee Php500.00; b. Compatibility Certificate Fee Php500.00; c. For every additional copy of certificate Php20.00; 10. OTHER LEGAL DOCUMENTS Php100.00/document; Fuel depot and fuel storage facilities Php 3,000.00; Micro Php 360.00; Cottage Php 300.00; Rural and Cooperative Banks Php 360.00; Small Php 420.00; Business Size Php Fee Per Annum',
    office: 'Office of the Mayor – Business Permits and Licensing Section',
    page: 56,
    processingTime: '2 days; 10 minutes; 30 minutes; 40 minutes',
    requirements: [
      {
        name: 'Duly accomplished retirement application from—2 original copies',
      },
      {
        name: 'Certificate of Business Retirement/ Cessation from the barangay',
      },
      { name: 'Sworn statement of gross receipt/sales for the current year' },
      {
        name: 'Mayor’s Permit for the current year and business registration late Window 1, Municipal Treasury, Ground Floor, Lal-lo Municipal Hall Barangay Hall (Location of Business) Business owner Business owner',
      },
    ],
    steps: [
      {
        action:
          'File and submit duly accomplished retirement application form with the complete requirements',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify and evaluate submitted documents: If application is deemed eligible and required documents are complete: None 2 days BPLO Staff/ BPLO- Designate',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          '2 Encode pertinent data in the system BPLO Staff/ BPLO- Designate ￼',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '3 Inspect the establishment to ascertain that the business is closed',
        number: '1.',
        role: 'agency',
      },
      {
        action: '1. If verified closed, approve the application',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          '2 If not closed, decline the application and inform the applicant BPLO Staff/ BPLO- Designate',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          'Treasurer will review and finalize the initial assessment of taxes Municipal Treasurer/Local Treasury Operations Officer',
        number: '1.4.',
        role: 'agency',
      },
      {
        action: 'Pay the taxes and certification fee',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive payment and issue official receipt/s Please refer to “Annex B” for the list of taxes, fees and charges indicated in the (TOP) that is based on the 2023 Revised Revenue Code of the Municipality of Lal-lo and other pertinent laws and ordinances Certificate of Retirement/Cessation of business- Php230.00 with DST 10 minutes Revenue Collection Clerk',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Receive the retirement certificate and official receipt',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue retirement certificate and official receipt None 30 minutes BPLO Staff/BPLO- Designate',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'APPLICATION FOR RETIREMENT OF BUSINESS',
    transactionTypes: ['G2B'],
    whoMayApply: 'Business owners or his duly authorized representative',
  },
  {
    category: 'Legislative services',
    classification: 'Complex',
    description:
      'Under the pertinent provisions of R.A. No. 7160, otherwise known as the Local Government Code of 1991, and its implementing rules and procedures, the Sangguniang Bayan is given the sole authority to grant franchises for the operation of tricycles-for-hire within its territorial jurisdiction.',
    endPage: 90,
    fees: 'None',
    office: 'Sangguniang Bayan Office',
    page: 88,
    processingTime: '10 minutes; 20 minutes; 5 minutes; 4 hours',
    requirements: [
      { name: '1 photocopy of OR/CR and present the original copy' },
      {
        name: '1 Photocopy of Compulsory insurance of the Motor and present the original copy',
      },
      { name: '1 Picture of the Tricycle for the -front - rear -side' },
      { name: '1 copy of 2x2 ID picture of the operator' },
      { name: '1 original copy of CTC or Cedula' },
      {
        name: '1 photocopy of Stencil of Engine & Chassis Number and present the original copy',
      },
      {
        name: '1 photocopy of unexpired Driver’s License and present the original copy',
      },
      { name: '3 Copies of Application Forms' },
      { name: 'Tricycle Unit subject for MTOP' },
    ],
    steps: [
      {
        action:
          'Submit accomplished application forms with complete requirements and present at the Sangguniang Bayan Office',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Evaluate the documents and issue order payment slip None 10 minutes Administrative Staff: Sangguniang Bayan Secretariat or Local Legislative Staff Officer or Local Legislative Assistant:',
        number: '1.1.',
        role: 'agency',
      },
      {
        action: 'Inspection of Tricycle None 20 minutes',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Proceed to payment (present issued order of payment) at the Treasurer’s office and submit official receipt to the SB Office',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Issue Official Receipt New Applicant: Filing of MTOP-',
        number: '2.',
        role: 'agency',
      },
      { action: '00 Annual Franchise-', number: '200.', role: 'agency' },
      { action: '00 Mayor’s Permit-', number: '200.', role: 'agency' },
      {
        action: '00 Mun. Plate-150.00 Fare Matrix– 250.00 Amendments–',
        number: '150.',
        role: 'agency',
      },
      {
        action: '00 For Renewal: Filing of MTOP-',
        number: '150.',
        role: 'agency',
      },
      { action: '00 Annual Franchise-', number: '200.', role: 'agency' },
      { action: '00 Mayor’s Permit-', number: '200.', role: 'agency' },
      {
        action:
          '00 Sticker– 50.00 5 minutes Revenue Collection Officer, Municipal Treasurer’s Office ￼',
        number: '150.',
        role: 'agency',
      },
      {
        action: 'Attend hearing and deliberation of the Franchise Applicant',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'The Lal-lo Tricycle Franchise Board shall convene to conduct the hearing and deliberation. None Every Monday (8:00 AM to 12:00 NN) 4 hours Lal-lo Tricycle Franchise Board Sangguniang Bayan Member',
        number: '3.',
        role: 'agency',
      },
      {
        action: 'Receive copy of Approved Franchise and Fare Matrix',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Release of Franchise None 5 minutes Administrative Staff: or Local Legislative Staff Officer or Local Legislative Assistant:',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF TRICYCLE FRANCHISE',
    transactionTypes: ['G2C'],
    whoMayApply:
      'All residents interested to operate tricycle for hire (legal age)',
  },
  {
    category: 'Legislative services',
    classification:
      'Simple Type of Transaction: G2C – Government to Client G2B – Government to Business G2G – Government to Government',
    description:
      'The Office of the Sangguniang Bayan is the repository of official records and documents on matters relating to the performance of the legislative functions of the Sanggunian such as the enacted ordinances, adopted or approved resolutions, and minutes of the meeting or session.',
    endPage: 92,
    fees: 'Php; TOTAL Php150.00 40 minutes',
    office: 'Sangguniang Bayan Office',
    page: 91,
    processingTime: '10 minutes; 5 minutes; 40 minutes',
    requirements: [
      { name: 'Any Government Issued Identification Card (Photocopy)' },
      { name: 'Filled-out request Form' },
    ],
    steps: [
      {
        action:
          'Present ID and fill out a Request Form indicating the specific document to be requested, the number of copies, and the purpose of securing',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Check the Identification Card and the duly filled out Request Form and forward the same to the Secretary to the Sangguniang Bayan for assessment. Instruct the client to pay the Secretary’s Fees at the None 10 minutes Administrative Staff and/or Local Legislative Staff Officer Secretary to the Sanggunian ￼ Treasurer’s office.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Pay the Secretary’s Fees and secures an Official Receipt from the Municipal Treasurer’s Office.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'The Municipal Treasurer’s Office accepts payment and issues OR Php',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '00 10 minutes Revenue Collection Clerk, Municipal Treasurer’s Office',
        number: '150.',
        role: 'agency',
      },
      {
        action:
          'Return to the Sangguniang Bayan Office for the processing of requested ordinance/s and/resolution/s',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Prepare the Documents with a signature attesting to the Certified True Copy and/or attach the official seal of the Sangguniang Bayan None 10 minutes Administrative Staff and/or Local Legislative Staff Officer Secretary to the Sanggunian',
        number: '3.1.',
        role: 'agency',
      },
      {
        action:
          'Verifies and logs the receipt number, documents to be released, and have the client sign the logbook. None 5 minutes Administrative Staff and/or Local Legislative Staff Officer',
        number: '3.2.',
        role: 'agency',
      },
      {
        action: 'Receive the requested document',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Release the duly signed certified true copy/ies of the document None 5 minutes Administrative Staff and/or Local Legislative Staff Officer',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFIED TRUE COPY OF OFFICIAL SB RECORDS',
    transactionTypes: [],
    whoMayApply: 'ALL',
  },
  {
    category: 'Legislative services',
    classification:
      'Simple Type of Transaction: G2C – Government to Client G2G – Government to Government',
    description:
      'A Certificate of Posting is being issued by the Office of the Sangguniang Bayan to an individual person, particularly to a court sheriff or to a staff or representative of a specific government/private organization or any corporate entity as a proof of such person’s act of displaying documents for public notice in this office for the purpose of conveying important information or announcements.',
    endPage: 93,
    fees: 'Php; TOTAL Php 150.00 1 hour',
    office: 'Sangguniang Bayan Office',
    page: 93,
    processingTime: '30 minutes; 10 minutes; 1 hour',
    requirements: [],
    steps: [
      {
        action:
          'Submit requirements to the Sangguniang Bayan Office for review',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify the completen ess of submitted documents None 30 minutes Administrative Staff and/or Local Legislative Staff Officer III',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Pay fees at the Office of the Municipal Treasurer',
        number: '2.',
        role: 'agency',
      },
      { action: 'Issue Official Receipt Php', number: '2.', role: 'agency' },
      {
        action: '00 10 minutes Revenue Collection Clerk Treasury Office',
        number: '150.',
        role: 'agency',
      },
      {
        action: 'Present the Official Receipt to the Sangguniang Bayan Office',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Prepare the documents None 10 minutes Administrative Staff and/or Local Legislative Staff Officer III',
        number: '3.',
        role: 'agency',
      },
      { action: 'Claim certificate of posting', number: '3.', role: 'agency' },
      {
        action:
          'Release Certificatio n None 10 minutes Administrative Staff and/or Local Legislative Staff Officer III',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFICATE OF POSTING',
    transactionTypes: [],
    whoMayApply: 'All',
  },
  {
    category: 'Legislative services',
    classification: 'Highly Technical/External',
    description:
      'Under the Local Government Code, the Sangguniang Bayan is empowered to act on certain requests, petitions and complaints by individuals, barangay officials, government offices and other parties.',
    endPage: 95,
    fees: 'Php; TOTAL Php',
    office: 'Sangguniang Bayan Office',
    page: 94,
    processingTime: '5 minutes; 90 days',
    requirements: [
      {
        name: 'Copy of verified petition or complaint duly signed by petitioner or complainant',
      },
      { name: 'Copy of Sworn statement of affidavit' },
      { name: 'Copy of Proper endorsement by concerned authority or officer' },
    ],
    steps: [
      {
        action: 'Complainant to submit a verified complaint',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Evaluate as to form & substance Conduct Preliminary Evaluation None 5 minutes SB Secretary/ Legislative Staff Officer IV',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Complainant shall pay the filling fee and present official receipt to the SB office',
        number: '2.',
        role: 'agency',
      },
      { action: 'Issue Official Receipt Php', number: '2.', role: 'agency' },
      {
        action:
          '00 5 minutes Revenue Collection Clerk Municipal Treasurer’s Office ￼',
        number: '500.',
        role: 'agency',
      },
      { action: 'Attend the scheduled hearing', number: '3.', role: 'agency' },
      {
        action:
          'Review and deliberation Render decision None (Must be terminated/decided within 90 days as per (Local Government Code) within 90 days The Presiding Officer and SB Members',
        number: '3.',
        role: 'agency',
      },
      {
        action: 'Receive copy of the rendered decision',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Furnished or served copies of the decision to the parties via personal/mailing delivery None (Must be terminated/decided within 90 days as per (Local Government Code) within 90 days Right after the adoption of the Sangguniang Bayan SB Secretariat',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'ACCEPTING OF ADMINISTRATIVE COMPLAINTS AGAINST BARANGAY OFFICIALS',
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply: 'All',
  },
  {
    category: 'Legislative services',
    classification: 'Highly Technical',
    description:
      'PEOPLES ORGANIZATIONS(POs) Pursuant to Article 62, Rule XIII of its Implementing Rules and Regulations of the Local Government Code known as RA No. 7160 mandates the establishment and operations of CSOs to make them active partners in the pursuit of local autonomy and to directly involve them in the plans, programs, projects or activities of the local government unit, such as, but not limited to, membership in local special bodies (LSBs) and involvement in the delivery of basic services and facilities.',
    endPage: 99,
    fees: 'Php; TOTAL Php150.00 30 working',
    office: 'Sangguniang Bayan Office',
    page: 96,
    processingTime:
      '15 minutes; 1 hour; 2 Hours; 30 minutes; 5 minutes; 10 minutes',
    requirements: [
      { name: 'Letter of Application' },
      { name: 'Duly Accomplished Application form' },
      { name: 'Certification of Registration' },
      { name: 'Duly Notarized Board Resolution' },
      { name: 'List of current Officers and Members' },
      { name: 'Constitution and By-laws' },
      { name: 'Annual Accomplishment Report' },
      { name: 'Annual Financial Statement' },
      {
        name: 'Minutes of the Annual Meeting Concerned CSO/PO Concerned CSO/PO Concerned CSO/PO Concerned CSO/PO Concerned CSO/PO Concerned CSO/PO Concerned CSO/PO Concerned CSO/PO Concerned CSO/PO',
      },
    ],
    steps: [
      {
        action:
          'Submit requirements to the Office of the Sangguniang Bayan for review and assessment',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receives application and check the completeness of requirements None 15 minutes SB Secretary Legislative Staff Officer IV ￼',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Include the matter in the Calendar of Business (To be referred to the concerned Committee (1st reading) None 1 Session Day Presiding Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'Clients attend committee meeting/ hearing',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Conduct Committee Meeting None 1 hour SB Members, Committee on Accreditation',
        number: '2.1.',
        role: 'agency',
      },
      {
        action:
          'Committee Chairman renders Committee Report None 1 Session Day SB Member, Committee Chair on Accreditation',
        number: '2.2.',
        role: 'agency',
      },
      {
        action:
          'Include proposed measure for second reading for proper deliberation of the body None 1 Session Day All SB Members',
        number: '2.3.',
        role: 'agency',
      },
      {
        action:
          'Include measure for 3rd and final reading None 1 Session Day All SB Members',
        number: '2.4.',
        role: 'agency',
      },
      {
        action:
          'Finalization and signing of the approved copies of resolution None 2 Hours SB Secretary',
        number: '2.5.',
        role: 'agency',
      },
      {
        action:
          'Transmit copies of the Resolution to the Office of the Mayor for Final Approval None 30 minutes. SB Secretariat Administrative Staff ￼',
        number: '2.6.',
        role: 'agency',
      },
      {
        action:
          'Upon return of the approved resolution from the Office of the Mayor, notify the client to secure copy of resolution and certificate of accreditation (and payment of fees for first time applicants) None 5 minutes SB Secretariat Administrative Staff',
        number: '2.7.',
        role: 'agency',
      },
      {
        action:
          'Proceed to SB Office to secure copy of the approved Resolution & Certificate of Accreditation.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Instruct the Client to secure Pay necessary fees to secure copy of approved accreditation None 5 minutes SB Secretariat Administrative Staff',
        number: '3.',
        role: 'agency',
      },
      {
        action: 'Pay Accreditation fee to the treasury office',
        number: '4.',
        role: 'agency',
      },
      { action: 'Release Official Receipt Php', number: '4.', role: 'agency' },
      {
        action:
          '00 10 minutes Revenue Collection Clerk Municipal Treasury Office',
        number: '150.',
        role: 'agency',
      },
      {
        action:
          'Return to SB Office and present the Official Receipt and Obtain the approved and duly signed Resolution and Certificate of Accreditation.',
        number: '5.',
        role: 'agency',
      },
      {
        action:
          'Prepare copy of resolution and the duly signed certificate of accreditation None 10 minutes. SB Secretariat Administrative Staff',
        number: '5.',
        role: 'agency',
      },
    ],
    title: 'ACCREDITATION OF CIVIL SOCIETY ORGANIZATIONS (CSOs) AND',
    transactionTypes: ['G2C'],
    whoMayApply:
      'All interested Civil Society Organizations (CSOs) and Peoples Organizations (POs)',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'The Community Tax Certificate (CTC) for individuals or otherwise known as cedula is an identification document issued by the local government to an individual upon payment of the community tax. It is also a proof that an individual resides in the municipality. Every inhabitant of the Philippines who is a resident of this municipality, eighteen (18) years of age or over who has been regularly employed on a wage or salary basis for at least thirty (30) consecutive working days during any calendar year, or who is engaged in business or corporation, or who owns real property with an aggregate assessed value of One Thousand (₱1,000.00) Pesos or more, or who is required by law to file an income tax return shall pay an annual community tax of Five (₱5.00) Pesos and an annual additional tax of One Peso (₱1.00) for every One Thousand Pesos (₱1,000.00) of income regardless of whether from business, exercise of profession or from property which in no case shall exceed Five Thousand Pesos (₱5,000.00) In the case of husband and wife, the additional tax herein imposed shall be based upon the total property owned by them and the total gross receipts or earnings derived by them.',
    endPage: 101,
    fees: 'One Thousand (₱1,000.00) Pesos or more, or who is required by law to file an income; tax return shall pay an annual community tax of Five (₱5.00) Pesos and an annual; additional tax of One Peso (₱1.00) for every One Thousand Pesos (₱1,000.00) of income; case shall exceed Five Thousand Pesos (₱5,000.00); (Php5.00) and; (Php1.00) for; (Php1,000) of; (Php5,000)',
    office: 'Municipal Treasurer’s Office',
    page: 100,
    processingTime: '10 minutes; 5 minutes; 15 minutes',
    requirements: [
      {
        name: 'One government-issued identification card (ID), school ID, or company ID—to be presented',
      },
    ],
    steps: [],
    title:
      'ISSUANCE OF COMMUNITY TAX CERTIFICATE (CTC) OR CEDULA FOR INDIVIDUALS',
    transactionTypes: ['G2C'],
    whoMayApply:
      'Every inhabitant of the Municipality of Lal-lo, eighteen (18) years of age or over.',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'The Community Tax Certificate (CTC) for corporation is an identification document issued by the local government to a corporation upon payment of the community tax. It is also a proof that a corporation resides in the municipality. Every corporation no matter how created or organized, whether domestic or resident- foreign, engaged in or doing business in the Philippines whose principal office is located in this Municipality shall pay an annual Community Tax of Five Hundred Pesos (₱500.00) and an additional tax, which in no case, shall exceed Ten Thousand Pesos (₱10,000.00) in accordance with the following schedule: For every Five Thousand (P5,000.00) Pesos worth of real property in the Philippines owned by it during the preceding year based on the valuation used in the payment of real property tax under existing laws, found in the assessment rolls of this municipality where the real property is situated - Two (P2.00) Pesos; and for every Five Thousand (P5,000.00) Pesos of gross receipts or earnings derived by it from its business in the Philippines during the preceding year - Two (P2.00) Pesos. The dividends received by a corporation from another corporation shall, for the purpose of the additional tax, be considered as part of the gross receipts or earnings of said corporation.',
    endPage: 103,
    fees: 'in this Municipality shall pay an annual Community Tax of Five Hundred Pesos (₱500.00); and an additional tax, which in no case, shall exceed Ten Thousand Pesos (₱10,000.00); (Php500) and; (Php2.00) for; (Php5,000) of; (Php10,000)',
    office: 'Municipal Treasurer’ s Office',
    page: 102,
    processingTime: '15 minutes; 5 minutes; 20 minutes',
    requirements: [
      {
        name: 'Securities and Exchange Commission (SEC) Registration—1 photocopy',
      },
    ],
    steps: [],
    title:
      'ISSUANCE OF COMMUNITY TAX CERTIFICATE (CTC) OR CEDULA FOR CORPORATIONS',
    transactionTypes: ['G2C'],
    whoMayApply:
      'Every corporation no matter how created or organized, whether domestic or resident-foreign, engaged in or doing business in the Philippines whose principal office is located in this Municipality',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'Real property tax is an annual ad valorem tax on real property such as land, building, machinery, and other improvements. The province imposes a 1% basic real property tax on the assessed value of the real property and an additional levy of 1% of the assessed value of the property for the Special Education Fund.',
    endPage: 104,
    office: 'Municipal Treasurer’s Office',
    page: 104,
    processingTime: '10 minutes; 5 minutes; 15 minutes',
    requirements: [
      { name: 'Latest real property tax receipt—to be presented' },
      {
        name: 'If no real property tax receipt is available, tax declaration of the property—to be presented',
      },
    ],
    steps: [
      {
        action:
          'Proceed to window 3 and present latest real property tax receipt/tax declaration to collection officer to identify property',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify payment record/s and issue the tax order of payment (TOP) None 10 minutes Local Revenue Collection Officer/Revenue Collection Clerk',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive the TOP, pay the tax due and receive the real property tax receipt',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Accept the payment and issue real property tax receipt Basic tax of 1% and SEF tax of 1% based on the assessed value of the property 5 minutes Local Revenue Collection Officer/Revenue Collection Clerk',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'PAYMENT OF REAL PROPERTY TAX OR AMILYAR',
    transactionTypes: ['G2C'],
    whoMayApply: 'Real property owners',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'The clearance is issued to taxpayers who has no outstanding tax obligations to the municipality for the current year.',
    endPage: 105,
    fees: 'Php180.00; TOTAL Php180.00 15 minutes',
    office: 'Municipal Treasurer’s Office',
    page: 105,
    processingTime: '10 minutes; 5 minutes; 15 minutes',
    requirements: [
      {
        name: 'Real property tax receipt for the current year— to be presented',
      },
    ],
    steps: [
      {
        action:
          'Proceed to window 3 and present the real property tax receipt for the current year',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify the payment records None 10 minutes Local Revenue Collection Officer/ Assistant Municipal Treasurer',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Pay the certification fee and receive the official receipt and tax clearance',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the payment and issue official receipt and tax clearance Php180.00 with Documentary Stamp Tax (DST) 5 minutes Local Revenue Collection Officer/ Assistant Municipal Treasurer',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE TAX CLEARANCE FOR REAL PROPERTY TAX',
    transactionTypes: ['G2C'],
    whoMayApply: 'Property owners',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'The clearance is issued to taxpayers who has no outstanding tax obligations to the municipality for the current year.',
    endPage: 106,
    fees: 'Php180.00; TOTAL Php180.00 15 minutes',
    office: 'Municipal Treasurer’s Office',
    page: 106,
    processingTime: '10 minutes; 5 minutes; 15 minutes',
    requirements: [
      {
        name: 'Official receipt showing payment of business taxes, fees and charges for the current year—to be presented',
      },
    ],
    steps: [
      {
        action:
          'Proceed to window 2 and present the official receipt showing payment of business taxes, fees and charges for the current year',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify the payment None 10 minutes Local Treasury Operations Officer/ Revenue Collection Clerk',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Pay the certification fee and receive the official receipt and tax clearance',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the payment and issue official receipt and tax clearance Php180.00 with Documentary Stamp Tax (DST) 5 minutes Local Treasury Operations Officer/ Revenue Collection Clerk',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF TAX CLEARANCE FOR BUSINESS TAX',
    transactionTypes: ['G2C'],
    whoMayApply: 'Business Owners',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'The Certification is issued upon request of the client needing the document. All Certifications released by the Office is based on its official records and references.',
    endPage: 107,
    fees: 'Php180.00; TOTAL Php180.00 15 minutes',
    office: 'Municipal Treasurer’s Office',
    page: 107,
    processingTime: '30 minutes; 5 minutes; 15 minutes',
    requirements: [
      {
        name: 'Request letter specifying what to be certified by the office—1 original',
      },
    ],
    steps: [
      {
        action: 'Proceed to Window 4 or 5 and present submit request letter',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Verify records None 30 minutes Revenue Collection Clerk',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Pay the fee, receive the official receipt and certificate',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the payment and issue official receipt and tax clearance Php180.00 with Documentary Stamp Tax (DST) 5 minutes Revenue Collection Clerk',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFICATION',
    transactionTypes: ['G2C'],
    whoMayApply: 'Clienteles',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'This refers to all other fees and charges imposed by the municipality.',
    endPage: 108,
    fees: 'Php180.00 with; Php20.00; TOTAL Php180.00 8 minutes',
    office: 'Municipal Treasurer’s Office',
    page: 108,
    processingTime: '3 minutes; 5 minutes; 8 minutes',
    requirements: [{ name: 'Order of Payment—1 original' }],
    steps: [
      {
        action: 'Present the order of payment at Window 4 or 5',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive Order of Payment None 3 minutes Revenue Collection Clerk',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Pay and receive the official receipt',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive payment and issue official receipt Certified true copy of official receipt- Php180.00 with documentary stamp For each additional page- Php20.00 Other Certifications- Php180.00 with documentary stamp 5 minutes Revenue Collection Clerk',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'PAYMENT OF OTHER FEES AND CHARGES',
    transactionTypes: ['G2C'],
    whoMayApply: 'Clienteles',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'Large cattle shall be registered with the Municipal Treasurer upon reaching the age of two (2) years. large cattle include a two-year old horse, mule, ass, carabao, cow or other domesticated member of the bovine family.',
    endPage: 109,
    fees: 'Php100.00; Php300.00; Php50.00; fee-Php50.00; TOTAL Php500.00 35 minutes',
    office: 'Municipal Treasurer’s Office',
    page: 109,
    processingTime: '10 minutes; 5 minutes; 35 minutes',
    requirements: [
      {
        name: 'Certification from the Barangay that the large cattle is owned by the individual—1 original copy',
      },
      { name: 'Large cattle to be branded—to be presented' },
      { name: 'Private iron brand—to be presented' },
    ],
    steps: [
      {
        action: 'Present all requirements including',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1 Review documents being presented None 10 minutes Revenue Collection Clerk',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '2 Register iron brand in the books and accomplish the facsimile, if not yet registered 10 minutes',
        number: '1.',
        role: 'agency',
      },
      {
        action: '3 Inspect the large cattle 10 minutes',
        number: '1.',
        role: 'agency',
      },
      { action: 'Pay fees', number: '2.', role: 'agency' },
      {
        action:
          'Collect correspondin g applicable fees, issue official receipt and certificate of ownership of large cattle Certificate of ownership- Php100.00 Registration of private brand- Php300.00 Inspection fee- Php50.00 Branding service fee-Php50.00 5 minutes Revenue Collection Clerk',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'REGISTRATION OF LARGE CATTLE',
    transactionTypes: ['G2C'],
    whoMayApply: 'Large cattle owners',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'A transfer of ownership of large cattle shall be registered with the Municipal Treasurer and pay the fees. The transfer of the large cattle, regardless of its age, shall be entered in the registry book setting forth, among others, the names and the residence of the owners and the purchaser; the consideration or purchase price of the animal for sale or transfer, class, sex, brands and other identifying marks of the animals; and a reference by number to the original certificate of ownership with the name of the municipality issued to it. No entries of transfer shall be made or certificate of transfer shall be issued by the Municipal Treasurer except upon the production of the original certificate of ownership and certificates of transfer and such other documents that show title to the owner.',
    endPage: 110,
    fees: 'transferPhp100.00; Php50.00; fee-Php50.00; TOTAL Php200.00 20 minutes',
    office: 'Municipal Treasurer’s Office',
    page: 110,
    processingTime: '15 minutes; 3 minutes; 2 minutes; 20 minutes',
    requirements: [
      { name: 'Original Certificate of Ownership—to be presented' },
      { name: 'Certificate of Transfer—to be presented' },
      { name: 'Large cattle to be transferred—to be presented' },
    ],
    steps: [
      {
        action:
          'Present all requirements including the large cattle to be transferred',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Review documents being presented None 15 minutes Revenue Collection Clerk',
        number: '1.1.',
        role: 'agency',
      },
      {
        action: 'Inspect the large cattle to be transferred',
        number: '1.2.',
        role: 'agency',
      },
      { action: 'Pay fees', number: '2.', role: 'agency' },
      {
        action:
          'Collect corresponding applicable fees Certificate of transferPhp100.00 Inspection fee- Php50.00 Branding service fee-Php50.00 3 minutes Revenue Collection Clerk',
        number: '2.1.',
        role: 'agency',
      },
      {
        action:
          'Issue official receipt and certificate of transfer of ownership of large cattle 2 minutes',
        number: '2.2.',
        role: 'agency',
      },
    ],
    title: 'TRANSFER OF OWNERSHIP OF LARGE CATTLE',
    transactionTypes: ['G2C'],
    whoMayApply: 'Large cattle owners',
  },
  {
    category: 'Treasury and taxation',
    classification: 'Simple',
    description:
      'The municipality’s mode of disbursement is mainly through checks. The Municipal Treasurer releases the check only to the payee or his duly authorized representative.',
    endPage: 112,
    office: 'Municipal Treasurer’s Office',
    page: 111,
    processingTime: '10 minutes; 5 minutes; 15 minutes',
    requirements: [{ name: 'Valid Identification cards (ID)-to be presented' }],
    steps: [
      {
        action:
          'Proceed to Window 6 and inquire if your check is ready for release and present ID',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Check if check being claimed is for release and verify identification of claimant None 10 minutes Cashier',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Sign the disbursement voucher and receive the check',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Let client sign the disbursement voucher, release check and return the ID None 5 minutes Cashier',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'RELEASING OF CHECKS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Clients',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'This is the process of registering Certificate of Live Birth of Filipino Citizens, from in the Lal-lo within thirty (30) days from date of Birth.',
    endPage: 114,
    office: 'Municipal Civil Registrar’s Office',
    page: 113,
    processingTime: '15 minutes; 10 minutes; 40 minutes',
    requirements: [],
    steps: [],
    title: 'REGISTRATION OF REGULAR AND TIMELY CERTIFICATE OF LIVE BIRTH',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'Certificate of Marriage is a social document that shows legal contract between a man and a woman that unites their lives legally.',
    endPage: 116,
    fees: '₱500.00',
    office: 'Municipal Civil Registrar’s Office',
    page: 115,
    processingTime: '15 minutes; 10 minutes; 5 minutes; 45 minutes',
    requirements: [],
    steps: [],
    title: 'REGISTRATION OF CERTIFICATE OF MARRIAGE',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'Certificate of Death is a record of vital information on the identity of the deceased. It shall be the responsibility of the nearest relative or spouse who has knowledge of the death to report the same within forty-eight (48) hours.',
    endPage: 118,
    fees: 'TOTAL ₱500.00',
    office: 'Municipal Civil Registrar’s Office',
    page: 117,
    processingTime:
      '15 minutes; 20 minutes; 10 minutes; 5 minutes; 1 hour; 10\nminutes',
    requirements: [],
    steps: [],
    title: 'REGISTRATION OF CERTIFICATE OF DEATH',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Complex Transaction',
    description:
      'This is the process of registering the Certificate of Live Birth of Filipino citizens, born in Lal-lo, after the thirty (30) days filing period from the date of Birth of the person or those who have no existing record in the register of Births of the Municipality.',
    endPage: 121,
    fees: '₱255.00; ₱150.00; Document- ₱100.00; TOTAL ₱655.00 1 hour & 10',
    office: 'Municipal Civil Registrar’s Office',
    page: 119,
    processingTime:
      '30 minutes; 10 minutes; 15 minutes; 5 minutes; 10 days; 1 hour; 10\nminutes',
    requirements: [
      {
        name: 'Interview the Clients None 30 minutes Registration Officer I Asst. Registration Officer Administrativ e Aide III ( Clerk I)',
      },
      { name: 'Examine and check the documents' },
      { name: 'Payment of Fees' },
      {
        name: '1 Receive payment and issue official receipt PSA/BREQS - ₱255.00 Delayed Registration Fee - ₱150.00 Other Legal Document- ₱100.00 Endorsement Fee - ₱150.00 10 minutes Revenue Collection Clerk (Municipal Treasurer’s Office)',
      },
      { name: 'Present Official Receipt (OR)' },
      {
        name: 'Preparation of documents None 15 minutes Registration Officer I Asst. Registration Officer Administrativ e Aide III (Clerk I)',
      },
      { name: 'Review and Sign the documents 5 minutes' },
      { name: 'Posting of notice of delayed registration 10 days' },
      { name: 'Presen t' },
      {
        name: 'Release the document None 5 minutes Registration Officer I ￼ claiming stub and get the documen t Asst. Registration Officer Administrativ e Aide III (Clerk I) TOTAL ₱655.00 1 hour & 10 minutes ￼',
      },
    ],
    steps: [],
    title: 'DELAYED REGISTRATION OF CERTIFICATE OF LIVE BIRTH',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Complex Transaction',
    description:
      'This is the process of registering the Certificate of Marriage of Filipino citizens, after the thirty (30) days filing period from the date of Marriage of the couple that who have no existing record in the register of Marriage of the Municipality.',
    endPage: 123,
    fees: 'PSA/BREQS -₱255.00; Fee - ₱150.00; Document- ₱100.00; ₱150.00; TOTAL ₱655.00 1 hour',
    office: 'Municipal Civil Registrar’s Office',
    page: 122,
    processingTime: '30 minutes; 10 minutes; 15 minutes; 5 minutes; 1 hour',
    requirements: [
      { name: 'Present the required documents for Delayed Registration' },
      {
        name: 'Interview the Clients None 30 minutes Registration Officer I Asst. Registration Officer Administrativ e Aide III (Clerk I)',
      },
      { name: 'Examine and check the documents' },
      { name: 'Payment of Fees' },
      {
        name: '1 Receive payment and issue official receipt PSA/BREQS -₱255.00 Delayed Registration Fee - ₱150.00 Other Legal Document- ₱100.00 Endorsement Fee - ₱150.00 10 minutes Revenue Collection Clerk (Municipal Treasurer’s Office) ￼',
      },
      { name: 'Present Official Receipt (OR)' },
      {
        name: 'Preparation of documents None 15 minutes Registration Officer I Asst. Registration Officer Administrativ e Aide III ( Clerk I)',
      },
      { name: 'Review and Sign the documents' },
      { name: 'Posting of notice of delayed registration' },
      { name: 'Presen t claiming stub and get the documen t' },
      {
        name: 'Release the document None 5 minutes Registration Officer I Asst. Registration Officer Administrativ e Aide III (Clerk I) TOTAL ₱655.00 1 hour ￼',
      },
    ],
    steps: [],
    title: 'DELAYED REGISTRATION OF CERTIFICATE OF MARRIAGE',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Complex Transaction',
    description:
      'This is the process of registering the Certificate of Death of Filipino citizens, died in Lal- lo, after the thirty (30) days filing period from the date of Death of the person that who have no existing record in the register of Marriage of the Municipality.',
    endPage: 125,
    fees: 'PSA/BREQS -₱255.00; Fee - ₱150.00; Document- ₱100.00; ₱150.00; TOTAL: ₱655.00 1 hour',
    office: 'Municipal Civil Registrar’s Office',
    page: 124,
    processingTime: '30 minutes; 10 minutes; 15 minutes; 5 minutes; 1 hour',
    requirements: [
      { name: 'Present the required documents for Delayed Registration' },
      {
        name: 'Interview the Clients None 30 minutes Registration Officer I Asst. Registration Officer Administrative Aide III ( Clerk I)',
      },
      { name: 'Examine and check the documents' },
      { name: 'Payment of Fees' },
      {
        name: '1 Receive payment and issue official receipt PSA/BREQS -₱255.00 Delayed Registration Fee - ₱150.00 Other Legal Document- ₱100.00 Endorsement Fee - ₱150.00 10 minutes Revenue Collection Clerk (Municipal Treasurer’s Office)',
      },
      {
        name: 'Present 3.1.Preparation of documents None 15 minutes Registration Officer I ￼ Official Receipt (OR)',
      },
      {
        name: 'Review and Sign the documents Asst. Registration Officer Administrative Aide III (Clerk I)',
      },
      { name: 'Posting of notice of delayed registration' },
      { name: 'Present claiming stub and get the document' },
      {
        name: 'Release the document None 5 minutes Registration Officer I Asst. Registration Officer Administrative Aide III (Clerk I) TOTAL: ₱655.00 1 hour ￼',
      },
    ],
    steps: [],
    title: 'DELAYED REGISTRATION OF CERTIFICATE OF DEATH',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'For the original registered documents of Certificate of Live Birth, this is issued to clients for any legal services it may serve.',
    endPage: 127,
    fees: '₱100.00; ₱30.00 (Documentary; TOTAL ₱130.00 50 minutes',
    office: 'Municipal Civil Registrar’s Office',
    page: 126,
    processingTime: '20 minutes; 10 minutes; 50 minutes',
    requirements: [],
    steps: [],
    title: 'ISSUANCE OF CERTIFICATION OF LIVE BIRTH',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'For the original registered documents of Certificate of Marriage, this is issued to clients for any legal services it may serve.',
    endPage: 129,
    fees: '₱100.00; ₱30.00 (Documentary; TOTAL ₱130.00 50 minutes',
    office: 'Municipal Civil Registrar’s Office',
    page: 128,
    processingTime: '20 minutes; 10 minutes; 50 minutes',
    requirements: [],
    steps: [],
    title: 'ISSUANCE OF CERTIFICATION OF MARRIAGE',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'For the original registered documents of Certificate of Death, this is issued to clients for any legal services it may serve.',
    endPage: 131,
    fees: '₱100.00; ₱30.00 (Documentary; TOTAL ₱130.00 50 minutes',
    office: 'Municipal Civil Registrar’s Office',
    page: 130,
    processingTime: '20 minutes; 10 minutes; 50 minutes',
    requirements: [],
    steps: [],
    title: 'ISSUANCE OF CERTIFICATION OF DEATH',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Complex Transaction',
    description:
      'All applicants who wish to apply for a marriage license can avail so long as they are qualified to do so with complete requirements so that they can marry at any given time.',
    endPage: 134,
    fees: '₱300.00; Counseling-₱200.00; ₱2.00 10 minutes Municipal; TOTAL ₱502.00',
    office: 'Municipal Civil Registrar’s Office',
    page: 132,
    processingTime:
      '10 minutes; 5 minutes; 3 hours; 30 Minutes; 30 minutes; 10 days; 20 minutes; 5\nhour; 15\nminutes',
    requirements: [],
    steps: [],
    title: 'APPLICATION FOR THE ISSUANCE OF MARRIAGE LICENSE',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Highly Technical',
    description:
      'Any petitions under RA 9048 and RA 10172 change of name and clerical errors are hereby accepted within the meaning of the law with complete requirements.',
    endPage: 137,
    fees: 'Name-₱3,000.00; ₱1,000.00; ₱1000.00; ₱500.00; ₱150.00',
    office: 'Municipal Civil Registrar’s Office',
    page: 135,
    processingTime:
      '2 months; 10 minutes; 30 minutes; 15 minutes; 5 minutes; 6 months; 1 month; 7 months; 2\nweek; 1\nhour; 10\nminutes',
    requirements: [
      {
        name: 'Petition for Change of First Name • PSA and Local Birth Certificate • NBI Clearance • Police Clearance • Barangay Clearance • Baptismal Certificate • Medical Record • Marriage Contract • School Records • Birth Certificate of children • Certificate of No Pending Administrative, Criminal Record and Employment (if applicable) NOTE: • 2 copies of each documents • Subject for publication for at least once a week for 2 consecutive weeks in a newspaper • Transmittal of Petition to PSA/concerned LCR (follow-up after 2 months)',
      },
      {
        name: 'Petition for Correction of Clerical Error • PSA and Local Birth Certificate • Baptismal Certificate • Birth Certificate of Mother/Father',
      },
    ],
    steps: [],
    title:
      'PETITION FOR CHANGE OF FIRST NAME AND CORRECTION AND CLERICAL ERROR',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'This is the process of allowing the child, born from March 19, 2004 onwards, whose parents are not married during the time of birth up to the present, but was acknowledge by the father, to use the surname of the father.',
    endPage: 140,
    fees: 'Service Fee-₱150; ₱300.00 10 minutes; TOTAL ₱450.00 2 days and 25',
    office: 'Municipal Civil Registrar’s Office',
    page: 138,
    processingTime: '15 minutes; 10 minutes; 2 days; 25\nminutes',
    requirements: [],
    steps: [],
    title: 'ADMISSION OF PATERNITY',
    transactionTypes: ['G2C'],
    whoMayApply: 'Parents of Lal-lo, Cagayan – born illegitimate children',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'Legitimation is the process of allowing the child who was born outside marriage of parents who at the time of conception of the former were not disqualified by any impediment to marry each other.',
    endPage: 143,
    fees: '₱300.00; ₱150.00; AUSF -₱150.00; TOTAL ₱900.00 1 hour and',
    office: 'Municipal Civil Registrar’s Office',
    page: 141,
    processingTime: '10 minutes; 15 minutes; 20 minutes; 1 hour; 30 minutes',
    requirements: [],
    steps: [],
    title: 'LEGITIMATION (RA9858)',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'Supplemental reports involve missing entries which were not supplied during the registration of the event but not to circumvent the data previously given.',
    endPage: 145,
    fees: '₱150.00; PSA-₱155.00; LBC Fee-₱150.00; TOTAL ₱455.00 55 minutes',
    office: 'Municipal Civil Registrar’s Office',
    page: 144,
    processingTime: '5 minutes; 20 minutes; 10 minutes; 55 minutes',
    requirements: [],
    steps: [],
    title: 'SUPPLEMENTAL REPORT',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'These are petitions applied by clients through proper court which will be registered and endorsed at PSA with proper and correct annotations once there is a decision with finality.',
    endPage: 147,
    fees: '₱1000.00; Fee-₱150.00; TOTAL ₱2,150.00 1 hour and',
    office: 'Municipal Civil Registrar’s Office',
    page: 146,
    processingTime:
      '15 minutes; 5 minutes; 20 minutes; 10 minutes; 1 hour; 25 minutes',
    requirements: [],
    steps: [],
    title:
      'REGISTRATION OF COURT ORDERS, DECREES AND REQUEST OF ANNOTATED RECORD',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Simple',
    description:
      'There are instances where PSA does not have available records requested by clients. In cases like this the clients hereby the availability of the records at the office of Municipal Civil Registrar where the documents was registered.',
    endPage: 149,
    fees: '₱150.00 10 minutes; TOTAL ₱150.00 15 working days',
    office: 'Municipal Civil Registrar’s Office',
    page: 148,
    processingTime: '5 minutes; 10 minutes; 35 minutes',
    requirements: [],
    steps: [],
    title: 'ENDORSEMENT OF REGISTRY RECORDS TO PSA',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Civil registry',
    classification: 'Complex Transaction',
    description:
      'Clients can make request of their Civil Registry Documents in SECPA from the Philippine Statistics Authority (PSA) at the Municipal Civil Registrar’s (MCR) Office which shall be accepted and processed by batch to the CRS division of PSA Region 02 once or twice a week.',
    endPage: 152,
    fees: 'BREQS-₱100.00; ₱155.00; ₱210.00; TOTAL: ₱255.00/₱310.00 14 days and',
    office: 'Municipal Civil Registrar’s Office',
    page: 150,
    processingTime:
      '3 minutes; 2 minutes; 2 weeks; 5 minutes; 14 days; 15 minutes',
    requirements: [],
    steps: [],
    title: 'BATCH REQUEST SYSTEM (BREQ’S SERVICE)',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Health services',
    classification: 'Simple',
    description:
      'This provides medical assistance to any individual who needs medical attention. This aims to diagnose, treat, and provide appropriate medical assistance.',
    endPage: 155,
    fees: 'None',
    office: 'Municipal Health Office',
    page: 153,
    processingTime:
      '2 minutes; 30 minutes; 10 minutes; 5 minutes; 55 minutes; 2 hour; 18 minutes',
    requirements: [
      { name: 'Identification Card.' },
      {
        name: 'The requirement depends on the needed laboratory results of requesting physician to the clients who avails it.',
      },
    ],
    steps: [
      {
        action:
          'Register at the receiving area Ensure enlistment in the logbook None 2 minutes RHU Staff on duty * Safety protocols procedures, proceed to admitting area and secure queue number Ensure adherence/complia nce to procedures None 2 minutes Admitting Team',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Wait staff to retrieve clinical record/s. For new patients. a new clinical record will be filled out Ensure adherence/complia nce to procedures None 30 minutes Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Wait for number to be called. *Priority lane is provided for senior citizens, person with disabilities, pregnant and those with referral from BHS. Ensure adherence/complia nce to procedure/s. None 10 minutes Admitting team ￼ *Fast lane is provided for emergency cases/disease of public health concern.',
        number: '3.',
        role: 'agency',
      },
      {
        action: 'Recording of Vital signs and Chief complaints',
        number: '4.',
        role: 'agency',
      },
      {
        action: 'Vital Signs taking None 5 minutes RHU Staff on duty',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Pre-History Taking 5. History taking None 55 minutes RHU Staff on duty',
        number: '5.',
        role: 'agency',
      },
      {
        action: 'Consultation, History Taking, Physical Examination',
        number: '6.',
        role: 'agency',
      },
      {
        action:
          'Patient consultation and assessment None 30 minutes Municipal Health Officer',
        number: '6.',
        role: 'agency',
      },
      {
        action: 'Laboratory and ancillary test, if requested by physician',
        number: '7.',
        role: 'agency',
      },
      {
        action:
          'Ensure adherence/ compliance to procedures None Turn-around Time (TAT) will depend upon laboratory request requested Medical Technologist II',
        number: '7.',
        role: 'agency',
      },
      {
        action:
          'Proceed to the Municipal Treasurer’s Office to settle payments',
        number: '8.',
        role: 'agency',
      },
      {
        action:
          'Ensure adherence/ compliance to procedures None 5 minutes Revenue Collection Clerk Municipal Treasurer’s Office',
        number: '8.',
        role: 'agency',
      },
      {
        action:
          'Follow-up consultation, prescription of medications and procedural treatment',
        number: '9.',
        role: 'agency',
      },
      {
        action: 'Clinical Management None 30 minutes Municipal Health Officer',
        number: '9.',
        role: 'agency',
      },
      {
        action: 'Proceed to MHO’s Assistant (Nurse/',
        number: '10.',
        role: 'agency',
      },
      {
        action:
          "Carry-out physician's order with None 5 minutes RHU Staff on ￼ Midwife) proper instruction duty",
        number: '10.',
        role: 'agency',
      },
      {
        action: 'Proceed to Pharmacy and discharge from Clinic',
        number: '11.',
        role: 'agency',
      },
      {
        action:
          "Provide instruction and advise physician's prescription None 5 minutes Administrative Aide I",
        number: '11.',
        role: 'agency',
      },
    ],
    title: 'PROVISION OF OUTPATIENT CONSULTATION',
    transactionTypes: ['G2C'],
    whoMayApply: 'General Public',
  },
  {
    category: 'Health services',
    classification: 'Simple',
    description:
      'Medical certificate is a written statement from a physician or another medically qualified healthcare provider which attests the result of a medical examination of patient. It is issued to requesting client from any of the following purposes: employment, school requirement application for sick leave and any other purposes it may serve.',
    endPage: 158,
    office: 'Municipal Health Office',
    page: 156,
    processingTime:
      '1 minute; 2 minutes; 10 minutes; 3 minutes; 30 minutes; 57 minutes',
    requirements: [],
    steps: [
      { action: "Register in client's logbook.", number: '1.', role: 'agency' },
      {
        action: 'Ensure enlistment in the logbook. None 1 minute Triage Team',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Safety protocol procedures, proceed to admitting area and secure queue number.',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Ensure adherence to procedure/s None 2 minutes Admitting team',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Wait for number to be called. *Priority lane is provided for senior citizens, person with disabilities, pregnant and those with referral from BHS. *Fast lane is',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Ensure adherence/ compliance to procedure/s None 10 minutes Admitting team ￼ provided for emergency cases/disease of public health concern.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Present request and receipt to conduct medical examination. Receipt and complete laboratory test for medical certification',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Review request and receipt accordingly None 1 minute Nurse on Duty',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Submit for the conduct of initial assessment: vital signs, chief complaints, and initial assessment.',
        number: '5.',
        role: 'agency',
      },
      {
        action: "Patient's assessment None 3 minutes Nurse on Duty",
        number: '5.',
        role: 'agency',
      },
      {
        action:
          'History taking, physical examination and medical management, request of diagnostic procedures as needed and prescription.',
        number: '6.',
        role: 'agency',
      },
      {
        action:
          'Clinical Manageme nt. See Article D. 30 minutes Municipal Health Officer',
        number: '6.',
        role: 'agency',
      },
      {
        action: 'If needed, refer to other section or facility accordingly.',
        number: '7.',
        role: 'agency',
      },
      {
        action:
          'Provide instruction and referral form None 2 minutes Municipal Health Officer /Nurse',
        number: '7.',
        role: 'agency',
      },
      { action: 'Proceed to pharmacy as', number: '8.', role: 'agency' },
      {
        action:
          "Carry-out doctor's order with None 3 minutes Administrative Aide I ￼ needed. proper instructions",
        number: '8.',
        role: 'agency',
      },
      {
        action: 'Obtain the medical certificate',
        number: '9.',
        role: 'agency',
      },
      {
        action:
          'Issue medical certificate accordance with the facility policy. None 3 minutes Administrative Aide I',
        number: '9.',
        role: 'agency',
      },
      { action: 'Discharge of Clinic', number: '10.', role: 'agency' },
      {
        action:
          'Input the information in medical certificate logbook None 2 minutes Administrative Aide I',
        number: '10.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF MEDICAL CERTIFICATE',
    transactionTypes: [],
  },
  {
    category: 'Health services',
    classification: 'Simple',
    description:
      'Medical certificate is a written statement from a physician or another medically qualified healthcare provider which attests the result of a medical examination of patient. It is issued to requesting client from any of the following purposes: employment, school requirement application for sick leave and any other purposes it may serve.',
    endPage: 160,
    fees: 'None',
    office: 'Municipal Health Office',
    page: 159,
    processingTime: '1 minute; 2 minutes; 10 minutes; 3 minutes; 30 minutes',
    requirements: [],
    steps: [
      { action: "Register in client's logbook.", number: '1.', role: 'agency' },
      {
        action: 'Ensure enlistment in the logbook. None 1 minute Triage Team',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Safety protocol procedures, proceed to admitting area and secure queue number.',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Ensure adherence to procedure/s None 2 minutes Admitting team',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Wait for number to be called. *Priority lane is provided for senior citizens, person with disabilities, pregnant and those with referral from BHS. *Fast lane is provided for emergency cases/disease of public health concern.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Ensure adherence/c ompliance to procedure/s. None 10 minutes Admitting team',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Present request and receipt to conduct medical examination. Receipt and',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Review request and receipt accordingly None 1 minute Nurse on Duty ￼ complete laboratory test for medical certification',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Submit for the conduct of initial assessment: vital signs, chief complaints, and initial assessment.',
        number: '5.',
        role: 'agency',
      },
      {
        action: "Patient's assessment None 3 minutes Nurse on Duty",
        number: '5.',
        role: 'agency',
      },
      {
        action:
          'History taking, physical examination and medical management, request of diagnostic procedures as needed and prescription.',
        number: '6.',
        role: 'agency',
      },
      {
        action:
          'Clinical Management . See pages 142- 144 30 minutes Municipal Health Officer',
        number: '6.',
        role: 'agency',
      },
      {
        action: 'Obtain the medical/medico-legal certificate',
        number: '7.',
        role: 'agency',
      },
      {
        action:
          'Issue medico-legal certificate in accordance with the facility policy. None 2 minutes Municipal Health Officer /Nurse',
        number: '7.',
        role: 'agency',
      },
      {
        action: 'Obtain the medical certificate.',
        number: '8.',
        role: 'agency',
      },
      {
        action:
          'Issue medical certificate in accordance with the facility policy. None 3 minutes Administrative Aide I',
        number: '8.',
        role: 'agency',
      },
      {
        action: 'If needed, refer to other section or facility accordingly',
        number: '9.',
        role: 'agency',
      },
      {
        action:
          'Provide instruction and referral form None 2 minutes Nurse on Duty',
        number: '9.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF PERSON WITH DISABILITY CERTIFICATE',
    transactionTypes: [],
  },
  {
    category: 'Health services',
    classification: 'Simple',
    description:
      "The certificate of death is a permanent legal record which contains an individual's death information. It provides important information and data on the circumstances surrounding death.",
    endPage: 163,
    office: 'Municipal Health Office',
    page: 161,
    processingTime:
      '1 minute; 2 minutes; 10 minutes; 15 minutes; 42 minutes; 30 days; 48 hours',
    requirements: [],
    steps: [
      { action: "Register in client's logbook.", number: '1.', role: 'agency' },
      {
        action: 'Ensure enlistment in the logbook None 1 minute Admitting team',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Safety protocol procedures, proceed to waiting area and secure queue number.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Ensure adherence to procedure/s. None 2 minutes Admitting team',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Wait for number to be called. *Priority lane is provided for senior citizens, person with disabilities, pregnant and those with referral from BHS.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Ensure adherence/com pliance to procedure/s. None 10 minutes Admitting team ￼ *Fast lane is provided for emergency cases/disease of public health concern.',
        number: '3.',
        role: 'agency',
      },
      {
        action: 'Patients give relevant details/information',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Interviews relative of the patient. None 15 minutes Municipal Health Officer',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Provide all necessary information especially when death was not attended by medical practitioner.',
        number: '5.',
        role: 'agency',
      },
      {
        action:
          'Record the cause of death None 10 minutes Administrative Aide I',
        number: '5.',
        role: 'agency',
      },
      { action: 'Receives death certificate', number: '6.', role: 'agency' },
      {
        action:
          'Release the death certificate to immediate relative/authori zed representative None 2 minutes Administrative Aide I',
        number: '6.1.',
        role: 'agency',
      },
      {
        action:
          'Input the information in medical certificate logbook None 2 minutes Administrative Aide I',
        number: '6.2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF DEATH CERTIFICATE',
    transactionTypes: [],
  },
  {
    category: 'Health services',
    classification: 'Simple',
    description:
      'Sanitary Permit is a requirement in the issuance of Business Permit. Health Permit in addition to sanitary permit is a requirement in the issuance of business permit for food establishment. Observance of good environmental sanitation could prevent the occurrence of sanitation related illnesses and disease outbreaks.',
    endPage: 165,
    office: 'Municipal Health Office',
    page: 164,
    processingTime:
      '1 minutes; 2 minutes; 3 minutes; 5 minutes; 7 minutes; 26 minutes',
    requirements: [],
    steps: [
      {
        action:
          "Register in Client's logbook. Ensure enlistment in logbook None 1 minutes Triage Team",
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Safety protocol procedures, proceed to waiting area and secure queue number Ensure adherence to procedure/s None 2 minutes Triage Team',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          "Proceed to administrative area and look for sanitary inspector Assess client's specific needs/purposes None 3 minutes Sanitation Inspector I",
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Proceed to administrative area and look for sanitary inspector Review the receipt and record accordingly See Article D. 5 minutes Sanitation Inspector I',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Wait for compliance verification in the establishment as needed Conduct inspection None 7 minutes Sanitation Inspector I ￼',
        number: '6.',
        role: 'agency',
      },
      {
        action:
          'Go back to the office and get the issued sanitary permit instructed by the inspector Issue and record accordingly None 3 minutes Sanitation Inspector I',
        number: '7.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF SANITARY PERMIT',
    transactionTypes: [],
  },
  {
    category: 'Health services',
    classification: 'Simple',
    description:
      'Laboratory services provides a comprehensive range of diagnostic and clinical testing. It offers a vast array of secondary clinical services.',
    endPage: 170,
    fees: '1. Complete Blood Count (CBC) Php 50.00 Php 75.0',
    office: 'Municipal Health Office',
    page: 166,
    processingTime:
      '1 minute; 2 minutes; 10 minutes; 3 minutes; 5 minutes; 24 minutes',
    requirements: [],
    steps: [
      { action: "Register in client's logbook", number: '1.', role: 'agency' },
      {
        action:
          'Ensure enlistment in the logbook None 1 minute RHU Staff on Duty',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Safety protocol procedures, proceed to waiting area and secure queue number',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Ensure adherence to procedure/s None 2 minutes Admitting Team',
        number: '2.',
        role: 'agency',
      },
      { action: 'Wait for number to be called', number: '3.', role: 'agency' },
      {
        action:
          'Ensure adherence/complianc e to procedure/s None 10 minutes Admitting Team',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Present laboratory request form from out- patient department or other facility.',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Review and validate request properly. See Article D. 3 minutes Medical Technologist II',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Present official receipt for services to be done, as necessary.',
        number: '5.',
        role: 'agency',
      },
      {
        action:
          'Review the receipt and record accordingly None 1 minute Medical Technologist II ￼',
        number: '5.',
        role: 'agency',
      },
      {
        action: 'Follow staffs’ instruction for specimen required.',
        number: '6.',
        role: 'agency',
      },
      {
        action:
          'Requested laboratory test to performed according to protocol. None 5 minutes Medical Technologist II',
        number: '6.',
        role: 'agency',
      },
      {
        action: 'Wait for result as instructed.',
        number: '7.',
        role: 'agency',
      },
      {
        action:
          'Inform for turn- around-time (TAT) of the test conducted. None Turn- around-time (TAT) will depend upon laboratory tests requested Medical Technologist II',
        number: '7.',
        role: 'agency',
      },
      {
        action: 'Get the result and go back to the requesting physician.',
        number: '8.',
        role: 'agency',
      },
      {
        action:
          'Instruct client accordingly None 2 minutes Medical Technologist II',
        number: '8.',
        role: 'agency',
      },
    ],
    title: 'LABORATORY SERVICES',
    transactionTypes: [],
  },
  {
    category: 'Health services',
    classification: 'Simple',
    description:
      'Provision of dental health through diagnosis, treatment, and management of overall oral health care such as regular dental check-up & dentist consultation, prophylaxis and oral protectors, dental extractions, cavity fillings and dentures.',
    endPage: 173,
    office: 'Municipal Health Office',
    page: 171,
    processingTime:
      '1 minutes; 2 minutes; 10 minutes; 5 minutes; 20 minutes; 50 minutes',
    requirements: [],
    steps: [
      { action: "Register in client's logbook", number: '1.', role: 'agency' },
      {
        action: 'Ensure enlistment in the logbook None 1 minutes Dental Aide',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Safety protocol procedures, proceed to waiting area and secure queue number',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Ensure adherence to procedure/s None 2 minutes Dental Aide',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'For new patient, wait for number to be called. *Priority lane is provided for senior citizens, person with disabilities and heavily pregnant women.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Ensure adherence/compli ance to procedure/s None 10 minutes Admitting Team ￼',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'For room new patient, proceed to Nurse-on-duty for vital signs taking and clearance. ** Clients for follow-up and previous clients may immediately proceed to dental Vital signs taking None 5 minutes Nurse/Midwife on duty',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Obtain necessary request for specific oral health services to avail Provide request form. None 2 minutes Dental Aide',
        number: '5.',
        role: 'agency',
      },
      {
        action:
          'Proceed to dental room waiting area and wait for number to be called Call patient according to queue None 10 minutes Dentist II',
        number: '6.',
        role: 'agency',
      },
      {
        action:
          'Avail specific services as indicated Provide oral health services needed None 20 minutes Dentist II',
        number: '7.',
        role: 'agency',
      },
    ],
    title: 'DENTAL SERVICES',
    transactionTypes: [],
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Complex/External',
    description:
      'The Issuance of Locational Clearance is a service that certifies that the proposed development activity (referred as project) is allowed and consistent with the approved Comprehensive Land Use Plan (CLUP) and Zoning Ordinance of the Municipality of Lal- lo. The clearance ensures that land use and development proposals comply with existing planning policies, zoning regulations, and applicable laws prior to construction, operation, or permitting by other regulatory offices. The basis of the service is Municipal Ordinance No. 08 s. 2022 or the Integrated Zoning Ordinance (ZO) of Municipality of Lal-lo dated November 15, 2022, ratified by the Sangguniang Panlalawigan (SP) through SP Resolution No. 2022-11-368 dated December 14, 2022.',
    endPage: 179,
    fees: '1. Php 100,000.00 and below Php 288.00; 2. Over Php 100,000.00 to Php 200,000.00 Php 576.00; 3. Over Php 200,000.00 Php 720.00 + 1/10 of 1%; of cost in excess of Php; 1. Php 500,000.00 and below Php 1,440.00; 2. Over Php 500,000.00 to Php 2,000,000.00 Php 2,160,00; 3. Over Php 2,000,000.00 Php 3,600.00 + 1/10of 1%; Php2,000,000.00; 1. Php 2,000,000.00 and below Php 3,600.00; 2. Over Php 2,000,000.00 Php 3,600.00 + 1/10 of; Php 2,000,000.00; 1. Below Php 2,000,000.00 Php 2,880.00; 2. Over Php 2,000,000.00 Php 2,880.00 + 1/10 of; 1. Below Php 100,000.00 Php 1,440.00; 2. Over Php 100,000.00 to Php 500,000.00 Php 2,160.00; 3. Over Php 500,000.00 to Php 1,000,000.00 Php 2,880.00; 4. Over Php 1,000,000.00 to Php 2,000,000.00 Php 4,320.00; 5. Over Php 2,000,000.00 Php 7,200.00 + 1/10 of; a. Below Php 2,000,000.00 Php 7,200.00; b. Over Php 2,000,000.00 Php 7,200.00 + 1/10 of',
    office: 'Office of the Zoning Officer',
    page: 174,
    processingTime: '10 minutes; 3 days; 15 minutes; 2 hours; 35 minutes',
    requirements: [
      { name: 'Notarized Application Form (2 Original)' },
      { name: 'Barangay Clearance (1 Original)' },
      {
        name: 'Proof of Right Over Land (1 Original and 1 Photocopy) Any of the following: • Land title (OCT/TCT) registered in the name of the applicant; • Notarized Deed of Sale and copy of land title registered in the name of seller; • Notarized Contract to Sell/Contract to Lease and copy of land title registered in the name of Seller/Lessor; • Notarized Authorization to occupy the land and copy of land - Municipal Planning and Development Office (MPDO) - Barangay Hall where the project is located - Register of Deeds - Seller - Seller/Lessor - Land Owner ￼ title registered in the name of Affiant; • Tax Declaration registered in the name of the applicant and latest tax receipt supported by Affidavit of Undertaking',
      },
      { name: 'Vicinity Map (1 Original)' },
      { name: 'Site Development Plan (1 Original)' },
      {
        name: 'Bill of Materials/Project Cost Estimate with Complete Set of Plans (1 set Original)',
      },
      {
        name: 'Special Power of Attorney for application filed by a representative (1 Original)',
      },
      {
        name: 'Additional requirements are requested for Special Projects listed in Annex “A” - Municipal Assessor’s Office - Applicant’s contractor - Applicant’s contractor - Applicant’s contractor - Executed by the applicant',
      },
    ],
    steps: [
      {
        action:
          'Submit accomplishe d application form and complete documentary requirements at the MPDO',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive documents and check for completene ss. None 10 minutes Zoning Officer',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Conduct Site Validation of the project subject for application. None 3 days Zoning Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Notify Client and Issue Order of Payment. None 10 minutes Zoning Officer',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          'Pay Filing Fee at the Treasury Office by showing the Order of Payment.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Issue Official Receipt. Fee varies on the type of Project and Cost. Refer to the computation 15 minutes Municipal Treasurer ￼ of fee on Annex “B”.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Return to the MPDO for processing and release of Locational Clearance',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue the Locational Clearance to the Client None 2 hours Zoning Officer',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF LOCATIONAL CLEARANCE',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Individual landowners; Business owners and entrepreneurs; Property developers; Government agencies and institutions; Authorized representatives with written authority',
  },
  {
    category: 'Mayor and municipal services',
    classification:
      'of a specific parcel of land based on the approved Comprehensive Land Use Plan (CLUP) and Zoning Ordinance of the Municipality of Lal-lo. The certification indicates the allowable land uses in the area and is commonly required for business registration, project planning, land transactions, and other regulatory purposes. The basis of the service is Municipal Ordinance No. 08 s. 2022 or the Integrated Zoning Ordinance (ZO) of Municipality of Lal-lo dated November 15, 2022, ratified by the Sangguniang Panlalawigan (SP) through SP Resolution No. 2022-11-368 dated December 14, 2022. Office or Division: Office of the Zoning Officer',
    description:
      'The Issuance of Zoning Certification is a service that certifies the zoning classification of a specific parcel of land based on the approved Comprehensive Land Use Plan (CLUP) and Zoning Ordinance of the Municipality of Lal-lo. The certification indicates the allowable land uses in the area and is commonly required for business registration, project planning, land transactions, and other regulatory purposes. The basis of the service is Municipal Ordinance No. 08 s. 2022 or the Integrated Zoning Ordinance (ZO) of Municipality of Lal-lo dated November 15, 2022, ratified by the Sangguniang Panlalawigan (SP) through SP Resolution No. 2022-11-368 dated December 14, 2022.',
    endPage: 181,
    fees: 'Php',
    office: 'Office of the Zoning Officer',
    page: 180,
    processingTime: '10 minutes; 3 days; 15 minutes; 1 hour; 35 minutes',
    requirements: [
      { name: 'Notarized Application Form (2 Original)' },
      {
        name: 'Proof of Right Over Land (1 Original and 1 Photocopy) Any of the following: • Land title (OCT/TCT) registered in the name of the applicant; • Approved Subdivision Plan/Land Survey/Verification Survey indicating the portion of lot in the name of the applicant • Tax Declaration registered in the name of the applicant and latest tax receipt supported by Affidavit of Undertaking - Municipal Planning and Development Office (MPDO) - Register of Deeds (ROD) - Department of Environment and Natural Resources (DENR) - Municipal Assessor’s Office ￼',
      },
      { name: 'Vicinity Map (1 Original)' },
      {
        name: 'Special Power of Attorney for application filed by a representative (1 Original) - Applicant - Executed by the Applicant',
      },
    ],
    steps: [
      {
        action:
          'Submit accomplished application form and complete documentary requirements at the MPDO.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive documents and check for completeness None 10 minutes Zoning Officer',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Conduct Site Validation of lot subject for application. None 3 days Zoning Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Notify Client and Issue Order of Payment. None 10 minutes Zoning Officer',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          'Pay Filing Fee at the Treasury Office by showing the Order of Payment.',
        number: '2.',
        role: 'agency',
      },
      { action: 'Issue Official Receipt. Php', number: '2.', role: 'agency' },
      {
        action: '00 per hectare 15 minutes Municipal Treasurer',
        number: '720.',
        role: 'agency',
      },
      {
        action:
          'Return to the MPDO for the processing and release of Zoning Certification.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue Zoning Certification to the client. None 1 hour Zoning Officer',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF ZONING CERTIFICATION',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Individual landowners; Business owners and entrepreneurs; Property developers; Government agencies and institutions; Authorized representatives with written authority',
  },
  {
    category: 'Planning and zoning',
    classification: 'Simple',
    description:
      'The Request for Official Records is a service that provides clients with copies of official records, plans, maps, certifications, and other documents maintained by the Municipal Planning and Development Office. These records may be requested for reference, compliance with regulatory requirements, research, or other lawful purposes, subject to existing rules on data privacy and records management.',
    endPage: 184,
    fees: 'Php; Php 4.40; = Php 3.00',
    office: 'Municipal Planning and Development Office',
    page: 182,
    processingTime: '2 hours; 15 minutes; 30 minutes; 3 hours',
    requirements: [
      { name: 'Request letter addressed to the Mayor (1 Original)' },
      {
        name: 'Valid government-issued Identification Card (1 Photocopy) - Executed by the applicant - Appropriate government agency',
      },
    ],
    steps: [
      {
        action: 'Present request letter to the Office of the Mayor',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive request letter for appropriate action. None 2 hours Human Resources and Management Officer Mayor’s Office',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Submit approved request letter and photocopy of government- issued ID at the MPDO',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive documents and verify for completeness; issue Order of Payment if necessary None 15 minutes Municipal Planning and Development Officer',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Pay the required fees at the Treasury',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue Official Receipt Certified True Copy 15 minutes Municipal Treasurer ￼ Office by showing the Order of Payment of documents: • 5 pages or less = Php',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          '20 • Additional pages = Php 4.40 Photocopy of documents = Php 3.00 per page',
        number: '43.',
        role: 'agency',
      },
      {
        action:
          'Return to the MPDO for the processing and release of requested document/s',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Release document/s None 30 minutes Municipal Planning and Development Officer',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'REQUEST FOR OFFICIAL RECORDS',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Local and foreign investors Government agencies and institutions Researchers and students',
  },
  {
    category: 'Environment and waste',
    classification: 'Simple',
    description:
      'This service is provided to those who need immediate waste disposal outside the regular collection schedule, usually due to emergencies, special events, or bulky items.',
    endPage: 186,
    fees: 'None',
    office: 'Municipal Environment and Natural Resources Office',
    page: 185,
    processingTime: '10 minutes',
    requirements: [
      {
        name: 'Approved request letter for collection by the Local Chief Executive or designated OIC/Acting Mayor.',
      },
    ],
    steps: [
      {
        action:
          'Clients will call the office for the special collection of waste.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Accept the call and arrange the schedule of collection None 10 minutes Municipal Environment and Natural Resources Officer/Environmental Specialist I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Dispatch the collection Team None Administrative Aide I/Waste Collectors',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Clients will place their segregated garbage on the designated pick- up points in their respective barangays on the scheduled day of collection.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Waste collection team will collect the garbage None Administrative Aide I/Waste Collectors',
        number: '2.1.',
        role: 'agency',
      },
    ],
    title: 'GARBAGE COLLECTIONS (UNSCHEDULED GARBAGE COLLECTION)',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Residents of the municipality, educational institutions, government offices/agencies within the municipality and business establishments.',
  },
  {
    category: 'Disaster preparedness',
    classification: 'Simple Type of Transaction: G2C – Government to Client',
    description:
      'This service ensures the safety, health, and well-being of participants and attendees by providing qualified medical personnel equipped with first aid kits and emergency response tools during organized events such as school press conferences, athletic meets, religious gatherings, sports activities, and concerts. The presence of standby medics guarantees immediate medical response in case of accidents, injuries, or health emergencies, thereby promoting a secure environment and minimizing risks during large gatherings.',
    endPage: 189,
    office: 'Municipal Disaster Risk Reduction and Management Office',
    page: 187,
    processingTime: '5 Minutes; 10 minutes; 5 minutes; 30 minutes; 1 Hour',
    requirements: [{ name: 'Approved Request Letter' }],
    steps: [
      {
        action:
          'The requesting party must submit a request letter at least three (3) days prior to the start of the activity, addressed to the Office of the Mayor through the Municipal Disaster Risk Reduction and Management Office (MDRRMO), indicating the need for standby rescue personnel or medical team/s during their activity',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge request letter. None 5 Minutes Administrative Aide I Office of the Mayor',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Approval of the request letter None 10 minutes Municipal Mayor/Acting Mayor/ Officer in Charge',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Forward the approved request letter to the Municipal Disaster Risk Reduction and Management Office None 5 minutes Administrative Aide I Office of the Mayor ￼ or event. Failure to submit the request within the prescribed period shall be subject to discussion with the MDRRMO Head and/or endorsement to the Municipal Mayor. This requirement ensures that the medical team has sufficient time to prepare the necessary equipment and plan accordingly. The requesting party must also ensure that the request letter contains complete and accurate details, including the type of activity, location, date and start time, duration, participants, and the number of participants. It is further recommended that the requesting party attach the calendar of activities or the event schedule to',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          'MDRRMO notify the Operations and Warning Section Chief to dispatch the appropriate medical team/s for the said activity or event. For long-term activities, the Operations Section Chief shall prepare a rotational duty schedule for the assigned personnel. None 30 minutes Municipal Disaster Risk Reduction and Management Office /Operations and Warning Section Chief ￼ facilitate proper coordination and planning.',
        number: '1.4.',
        role: 'agency',
      },
      {
        action:
          'Upon approval, the requesting party is required to allocate time to provide a brief orientation to the dispatched medical team/s prior to their deployment to the assigned area.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'After the briefing, the dispatched team/s will proceed to the assigned area/s. None 10 minutes Medical Team Leader/s',
        number: '2.1.',
        role: 'agency',
      },
    ],
    title:
      'REQUEST FOR STANDBY MEDICS DURING PLANNED EVENTS (E.G. SCHOOL PRESS CONFERENCES, ATHLETIC MEETS, REGILIOUS GATHERINGS, SPORT ACTIVITIES, CONCERTS)',
    transactionTypes: [],
    whoMayApply: 'Anyone in need of standby Medical Team/s',
  },
  {
    category: 'Disaster preparedness',
    classification: 'Simple',
    description:
      '(Hospital-Hospital, Follow-up Check- Ups, Home -Hospital, Hospital– Home, Conveyance of Blood Donors or Fetching Blood) This service ensures that eligible residents have access to safe, reliable, and timely transportation for medical purpose and is designed to assist individuals who require conveyance to hospitals, clinics, or other health facilities for treatment, check-ups, or emergency care.',
    endPage: 199,
    fees: 'None',
    office: 'Municipal Disaster Risk Reduction and Management Office',
    page: 190,
    processingTime:
      '10 minutes; 5 minutes; 25 Minutes; 3 days; 5 Minutes; 15 minutes; 2 Minutes; 12 minutes; 10 Minutes',
    requirements: [],
    steps: [
      {
        action:
          'Requesting party (Hospital, patient, immediate relative/s or Significant Others of client/s) shall call the Municipal Disaster Operations Center Hotlines (09771266662 /09771266664) or report personally at the MDOC Lal-lo to provide the necessary details and to discuss important guidelines prior to transport (Patient’s Profile, Reason to Transfer, the name of hospital where the patient is currently admitted and the name',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Gather all necessary details (Patient’s Profile, Reason to Transfer, the name of hospital where the patient is currently admitted and the name of hospital where the patient will be transferred). None 10 minutes Radio Operator/Di spatcher ￼ of hospital where the patient will be transferred).',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'The requesting hospital must ensure that the patient for transfer is properly coordinated with the receiving clinic/hospital, or health care facility prior to transportation to facilitate a smooth endorsement. An ADVANCE CALL to the receiving facility is required before the transfer. The requesting hospital or the patient’s immediate relatives must ensure that an AFFILIATED OR ON- DUTY NURSE/MIDWIFE accompanies the patient during transport to provide proper handover and endorsement to the receiving facility. Relatives accompanying the patient will be limit to two (2). In cases where the patient requires transfer outside the Province of Cagayan, the requesting immediate relatives or significant others shall be responsible for shouldering the cost of additional fuel once the fuel initially provided by the MDRRMO ambulance has been consumed. Furthermore, it shall be the responsibility of the',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '1 Ensure that the patient scheduled for transfer is properly coordinated with the receiving hospital/health facility and is accompanied by an affiliated or on-duty nurse/midwife during transport. None 5 minutes Radio Operator/Di spatcher',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'After all necessary details have been gathered and confirmation has been made that the patient is properly coordinated with an affiliated or on-duty nurse/midwife who will accompany the patient, the dispatcher may proceed with the dispatch of the ambulance and crew to the hospital where the patient is initially admitted. The The requesting party (Significant Others) shall be responsible for the cost of additional fuel once the fuel initially provided by the MDRRMO has been consumed. 10 minutes Note: Availability of Ambulanc e Transport Service shall depend on the presence of transport ambulanc e, transport officer, responder s, and Radio Operator/Di spatcher/Di spatched Ambulance Crew/MDR RMO Head or Operations and Warning Section Chief (if the patient is for transfer outside Cagayan) ￼ requesting relatives or significant others to provide a private or duty nurse to accompany and attend to the patient during transport outside Cagayan. radio operator/dispatc her or any member of the ambulance crew shall likewise explain the Standard Operating Procedures (SOPs) of the MDRRM Office regarding patient transport, particularly for transfers outside the Province of Cagayan. nurse/mid wife. If there are no available on any of the aforementi oned, request for transport may not be granted.',
        number: '2.2.',
        role: 'agency',
      },
      {
        action:
          'Upon arrival at the destination, the patient or significant others may ask to sign the PCR Form indicating that they have been transported to their destination and that services have been provided.',
        number: '2.3.',
        role: 'agency',
      },
    ],
    title: 'PROVISION OF MEDICAL TRANSPORT SERVICES',
    transactionTypes: ['G2C'],
    whoMayApply: 'Patients for Transfer or assisted by Significant Other',
  },
  {
    category: 'Disaster preparedness',
    classification: 'Simple Type of Transaction: G2C– Government to Client',
    description:
      'This service allows residents, business owners, and other stakeholders to formally request access to CCTV footage for legitimate purposes such as investigation of incidents, verification of events, or support to law enforcement activities.',
    endPage: 201,
    office: 'Municipal Disaster Risk Reduction and Management Office',
    page: 200,
    processingTime: '1 minute; 10 minutes; 1 Hour; 1 hour; 11 minutes',
    requirements: [],
    steps: [
      {
        action:
          'The requesting party needs to request a CCTV Footage Access Form at the Municipal Disaster Operations Center. The client must fill- up the form completely and accurately.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Provision of CCTV Footage Access Form None 1 minute CCTV Operator in- charge',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Once filled-up, the client or requesting party must proceed to the Office of the Mayor for the Approval of the request form.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Acknowledgement and Approval of CCTV Footage Access Form None 10 minutes Administrative Aide I Office of the Mayor Mayor/Acting Mayor/OIC ￼',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Upon approval, the client or requesting party may now go back to the Municipal Disaster Operations Center and show the approved form to the CCTV Operator in-charge. With the confirmation of the CCTV Operator in Charge, the requesting party or client may now enter the CCTV Operating Room.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Confirmation of Approved CCTV Footage Access Form/ Review of CCTV Footage as requested by the client None 1 Hour CCTV Operator in- Charge',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'REQUEST FOR CCTV REVIEW',
    transactionTypes: [],
    whoMayApply: 'Anyone in need of CCTV Review',
  },
  {
    category: 'Disaster preparedness',
    classification: 'Simple Type of Transaction: G2C – Government to Client',
    description:
      'This service is designed to strengthen fire prevention, suppression, and emergency response through volunteer participation and auxiliary assistance.',
    endPage: 204,
    office: 'Municipal Disaster Risk Reduction and Management Office',
    page: 202,
    processingTime: '3 Minutes; 5 Minutes; 13 Minutes',
    requirements: [],
    steps: [
      {
        action:
          'If the caller initially dials the hotline of the Municipal Disaster Operations Center (0977-126- 662/0977- 126-6664), the caller must provide the following information: -Exact Place of Fire Incident -Time of Fire Incident -If there are casualties',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Acknowledge and gather all necessary details of incident. None 3 Minutes Radio Operator/Dispatch Officer',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'After gathering all the details, the radio operator/dispatcher will now then feedback to the Bureau of Fire Protection of Lal-lo about the Incident. None 5 Minutes Radio Operator/Dispatch Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'In the event that, upon assessment, the Bureau of Fire Protection determines the need for assistance from the Fire Auxiliary Service of None 5 Minutes Radio Operator/Dispatch Officer/Fire Auxiliary Team ￼ -Name of the caller the MDRRM Office, the dispatch officer shall deploy the MDRRM Fire Auxiliary Team.',
        number: '1.3.',
        role: 'agency',
      },
    ],
    title: 'FIRE AUXILIARY SERVICE',
    transactionTypes: [],
    whoMayApply: 'Anyone in need of assistance',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Enrollment and Updating of RSBSA is a continuing activity conducted by the Department of Agriculture, in coordination with Local Government Units, to register new farmers, fisherfolk, farmworkers, and other agricultural stakeholders, and to update existing records. This process ensures that personal, farm, and production data of beneficiaries are accurate and up to date. The RSBSA serves as the official database and reference for identifying qualified beneficiaries of government agricultural programs and services, including the provision of farm inputs, training, credit, insurance, and other forms of assistance. Regular enrollment and updating promote transparency, improve targeting of support, and strengthen the efficient delivery of agricultural interventions.',
    endPage: 206,
    office: 'Municipal Agriculture Office',
    page: 205,
    processingTime: '2 minutes; 5 minutes; 20 minutes; 3 days; 37 minutes',
    requirements: [
      { name: 'One (1) 2x2 picture' },
      { name: 'One (1) photocopy of any valid ID' },
      {
        name: 'Proof of ownership i. Land tittle ii. Tax declaration iii. Tenancy agreement iv. Lease agreement v. Barangay Certification',
      },
      {
        name: 'Duly completed and signed RSBSA enrollment form, certified by Barangay Captain For Updating',
      },
      { name: 'One (1) photocopy of any valid ID' },
      { name: 'Proof of ownership' },
      {
        name: 'Duly completed and signed RSBSA updating form. WHERE TO AVAIL Availing client ￼',
      },
    ],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for logbook registration.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designated AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Inquiry', number: '2.', role: 'agency' },
      {
        action:
          'Assist client None 5 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
      { action: 'Verification', number: '3.', role: 'agency' },
      {
        action:
          'Assist client None 5 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '3.',
        role: 'agency',
      },
      { action: 'Fill-out Enrollment form', number: '4.', role: 'agency' },
      {
        action:
          'Assist client None 20 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '4.',
        role: 'agency',
      },
      { action: 'Georeferencing', number: '5.', role: 'agency' },
      {
        action:
          'Assist client None 3 working days Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '5.',
        role: 'agency',
      },
      { action: 'Submit requirements', number: '6.', role: 'agency' },
      {
        action:
          'Assist client None 5 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '6.',
        role: 'agency',
      },
    ],
    title:
      'ENROLLMENT & UPDATING IN REGISTRY SYSTEM FOR BASIC SECTORS IN AGRICULTURE (RSBSA)',
    transactionTypes: ['G2C'],
    whoMayApply:
      'Farmers, Fisherfolks, Farmworkers, Livestock raisers and Agri youth',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'Enrollment in the National Coconut Farmers Registry System (NCFRS) refers to the process of officially registering coconut farmers, farm owners, workers, and other stakeholders in a government-maintained database managed by the Philippine Coconut Authority. This enrollment establishes a farmer’s official record and qualifies them to access government programs, services, and benefits for the coconut industry, including training, farm inputs, livelihood support, and assistance under the Coconut Farmers and Industry Development initiatives.',
    endPage: 208,
    office: 'Municipal Agriculture Office',
    page: 207,
    processingTime: '2 minutes; 5 minutes; 20 minutes; 32 minutes',
    requirements: [
      { name: 'One (1) 2x2 picture' },
      { name: 'One (1) photocopy of any valid government ID' },
      {
        name: 'Proof of ownership i. Land tittle ii. Tax declaration iii. Tenancy agreement iv. Lease agreement v. Barangay Certification',
      },
      {
        name: 'Duly completed and signed RSBSA enrollment form, certified by Barangay Captain CHECKLIST OF REQUIREMENTS Availing Client ￼',
      },
    ],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for logbook registration.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designate d AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Inquiry 2. Assist client None 5 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Verification 3. Assist client None 5 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '3.',
        role: 'agency',
      },
      { action: 'Fill-out Enrollment form', number: '4.', role: 'agency' },
      {
        action:
          'Assist client None 20 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'ENROLLMENT IN NATIONAL COCONUT FARMERS REGISTRY SYSTEM (NCFRS)',
    transactionTypes: ['G2C'],
    whoMayApply:
      'Farmers, Fisherfolks, Farmworkers, Livestock raisers and agri youth',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'This program aims to strengthen farmers’ capacity to prevent, identify, and manage pests and diseases affecting rice, corn, high value crops, and organically grown commodities through the provision of timely, science-based, and environment-friendly technical assistance. The program promotes Integrated Pest Management (IPM) and organic crop protection practices to reduce crop losses, minimize excessive use of chemical pesticides, protect human health, and conserve the environment. Emphasis is given to early detection, proper diagnosis, and appropriate control measures suited to local farming conditions.',
    endPage: 209,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 209,
    processingTime: '2 minutes; 30 minutes; 1 Day; 32 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook and will be referred to the assigned Agricultural Technologist (AT)/ Agricultural Extension Worker (AEW)',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designated AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Proceed to AT/ AEW', number: '2.', role: 'agency' },
      {
        action:
          'Conduct of on-site validation and provide recommenda tions and solutions None 30 minutes to 1 Day Senior Agriculturist/ Cooperatives Development Specialist II/',
        number: '2.',
        role: 'agency',
      },
    ],
    title:
      'PROVISION OF TECHNICAL ASSISTANCE ON RICE, CORN, HIGH VALUE CROPS AND ORGANIC DEVELOPMENT PROGRAM (HVCDP) PESTS AND DISEASES',
    transactionTypes: ['G2C'],
    whoMayApply: 'Farmers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Provision of Technical Assistance on Package of Technology aims to equip farmers with scientifically-tested, crop-specific technologies that enhance productivity, ensure sustainability, and improve farm income. This program provides hands-on guidance and coaching in adopting the latest production practices, appropriate farm management techniques, and organic farming methods for rice, corn, and high-value crops.',
    endPage: 210,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 210,
    processingTime: '2 minutes; 30 minutes; 1 Day; 32 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook and will be referred to the assigned Agricultural Technologist (AT)/ Agricultural Extension Worker (AEW)',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designat ed AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Proceed to AT/ AEW assigned', number: '2.', role: 'agency' },
      {
        action:
          'Briefing and recomme ndations will be given to the farmer dependin g on the concern None 30 minutes to 1 Day Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
    ],
    title:
      'PROVISION OF TECHNICAL ASSISTANCE ON PACKAGE OF TECHNOLOGY IN RICE, CORN, HIGH VALUE CROPS AND ORGANIC DEVELOPMENT PROGRAM (HVCDP)',
    transactionTypes: ['G2C'],
    whoMayApply: 'Farmers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Application and Claims for Crop Insurance is an agricultural support service designed to protect farmers from financial losses due to natural calamities, pests, diseases, and other unforeseen events affecting crop production. This activity assists farmers in applying for insurance coverage and facilitating the processing of claims in coordination with the Philippine Crop Insurance Corporation. The service includes orientation on insurance programs, assistance in completing application forms, validation of required documents, field verification of damaged crops, and endorsement of claims for evaluation and payment. It ensures that farmers are properly guided throughout the insurance process, from enrollment to compensation. Through timely application and efficient claims processing, the program strengthens farmers’ resilience, reduces financial risks, and promotes sustainable agricultural production.',
    endPage: 212,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 211,
    processingTime: '2 minutes; 5 minutes; 30 minutes; 42 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designated AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Proceed to AT assigned for verification',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Assist client None 5 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
      { action: 'Fill-out forms', number: '3.', role: 'agency' },
      {
        action:
          'Assist client in filling out Philippine None 30 minutes Senior Agriculturist/ Cooperatives ￼ Crop Insurance Corporation (PCIC) Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '3.',
        role: 'agency',
      },
      { action: 'Submit filled out forms', number: '4.', role: 'agency' },
      {
        action:
          'Submit to PCIC personnel None 5 minutes Administrative Assistant III',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'APPLICATION AND CLAIMS FOR CROP INSURANCE',
    transactionTypes: ['G2C'],
    whoMayApply: 'Farmers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'Soil Sample Analysis is an agricultural support service aimed at determining the nutrient status and overall condition of soil to guide farmers in proper crop and fertilizer management. This activity involves the systematic collection of soil samples from farms and their submission to accredited laboratories of the Department of Agriculture for scientific testing and evaluation. The analysis identifies soil pH, nutrient deficiencies, organic matter content, and other important properties affecting crop growth. Based on the results, site-specific fertilizer recommendations and soil management practices are provided to farmers to improve productivity and reduce unnecessary input costs. Through accurate soil assessment and proper advisory services, Soil Sample Analysis promotes balanced fertilization, sustainable land use, increased crop yield, and improved farm profitability.',
    endPage: 213,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 213,
    processingTime: '2 minutes; 10 minutes; 12 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook and will be referred to the assigned Agricultural Technologist (AT)',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designated AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Proceed to AT assigned', number: '2.', role: 'agency' },
      {
        action:
          'Submit to the assigned AEW soil sample collected for labelling and for submissio n to DA Region. None 10 minutes Senior Agriculturist/ Cooperatives Development Specialist II/ Agricultural Technologist/ Agricultural Technician/ Administrative Aide III/ Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'SOIL SAMPLE ANALYSIS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Farmers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Provision of Tractor Services is an agricultural support initiative aimed at assisting farmers in land preparation and other farm operations using mechanized equipment. This service provides access to tractors and related implements to help reduce labor costs, increase efficiency, and improve the timeliness of farming activities. The activity includes plowing, harrowing, and other land cultivation services conducted by trained operators to ensure proper field preparation for planting. It supports smallholder farmers who may not have the capacity to own farm machinery, thereby promoting inclusive access to agricultural mechanization programs of the Department of Agriculture. Through mechanized farm services, the project enhances productivity, shortens turnaround time between cropping cycles, and contributes to higher yields and improved income for farmers.',
    endPage: 214,
    fees: 'TOTAL Php2,500',
    office: 'Municipal Agriculture Office',
    page: 214,
    processingTime: '2 minutes; 5 minutes; 1 day; 12 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook and will be referred to the Tractor Operator',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designated AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Proceed to AT assigned/ Tractor Operator',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Collect farmer’s information and set schedule for the provision of service None 5 minutes Senior Agriculturist/ Cooperatives Development Specialist II/',
        number: '2.',
        role: 'agency',
      },
      { action: 'Operation Process', number: '3.', role: 'agency' },
      {
        action:
          'Harrow the field and measure the corn area through GPS None 1 day Administrative Aide I',
        number: '3.',
        role: 'agency',
      },
      { action: 'Payment of fees', number: '4.', role: 'agency' },
      {
        action:
          'The operator instructs the farmer to pay fees 2,500. 00 / ha 5 minutes Revenue Collection Clerk II, Municipal Treasurer’s Office',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'PROVISION OF TRACTOR SERVICES',
    transactionTypes: ['G2C'],
    whoMayApply: 'Farmers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Technical Assistance on Fish Culture Technology is a support service aimed at improving fish production, resource management, and income of fisherfolk and aquaculture operators. This initiative provides technical guidance and capacity-building activities based on recommended practices of the Bureau of Fisheries and Aquatic Resources. The assistance includes training on pond preparation, species selection, stocking density, feed management, water quality monitoring, disease prevention and control, and proper harvesting techniques. It also covers advisory services on sustainable aquaculture practices, climate- resilient fish farming, and post-harvest handling to maintain product quality. Through continuous technical support and field monitoring, the program enhances productivity, reduces production risks, and promotes sustainable and profitable fish culture operations.',
    endPage: 215,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 215,
    processingTime: '2 minutes; 5 minutes; 1 Day; 1 day; 7\nminutes',
    requirements: [],
    steps: [],
    title: 'TECHNICAL ASSISTANCE ON FISH CULTURE TECHNOLOGY',
    transactionTypes: ['G2C'],
    whoMayApply: 'Fisherfolks',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'This program facilitates the provision of quality fingerlings to qualified fish farmers and fisherfolk. It supports the establishment or expansion of fish culture operations, promotes higher survival and productivity rates, and contributes to increased fish production and income.',
    endPage: 216,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 216,
    processingTime: '2 minutes; 5 minutes; 10 minutes; 22 minutes',
    requirements: [],
    steps: [],
    title: 'REQUEST FOR FINGERLINGS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Fisherfolks',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Request for Fisherfolk/Boat Registration Certification is a service that facilitates the issuance of official certification confirming the registration of fisherfolk and/or fishing vessels. This certification serves as proof of compliance with fisheries regulations and is often required for availing government programs, permits, financial assistance, and other related transactions. The activity includes verification of registration records, validation of submitted documents, and preparation and release of the certification in coordination with the Bureau of Fisheries and Aquatic Resources and the Local Government Unit (LGU). Through efficient processing and proper documentation, the service ensures transparency, accurate record-keeping, and recognition of registered fisherfolk and fishing vessels, thereby strengthening fisheries management and access to government support services.',
    endPage: 217,
    fees: 'TOTAL Php130.00 32 minutes',
    office: 'Municipal Agriculture Office',
    page: 217,
    processingTime: '2 minutes; 5 minutes; 10 minutes; 32 minutes',
    requirements: [],
    steps: [],
    title: 'REQUEST FOR FISHERFOLK/ BOAT REGISTRATION CERTIFICATE',
    transactionTypes: ['G2C'],
    whoMayApply: 'Registered Fisherfolks',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'Fisherfolk Registration is a program that registers and documents municipal fisherfolk to establish an updated database. It ensures eligibility for government support, livelihood programs, and fisheries-related services while promoting responsible fishing practices and resource management.',
    endPage: 218,
    office: 'Municipal Agriculture Office',
    page: 218,
    processingTime: '2 minutes; 5 minutes; 20 minutes; 37 minutes',
    requirements: [
      { name: '2x2 ID Picture' },
      { name: 'Photocopy of valid government issued ID' },
    ],
    steps: [
      {
        action: 'Request for Fisherfolk/ Boat Registration',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Client will go to the MAO & register at the Log-Book None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Clients to be referred to Agricultural Technologist concern None 5 minutes Administrative Assistant III',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Agricultural Technologist to verify their names on Fish R/ Boat R System None 5 minutes Agricultural Technologist Administrative Aide I',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issuance of application form to be filled out by the client None 5 minutes Revenue Collection Clerk II, Municipal Treasurer’s Office',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Register client to Fisherfolk Registration System (FishR) None 20 minutes Agricultural Technologist/ Administrative Aide I',
        number: '5.',
        role: 'agency',
      },
    ],
    title: 'FISHERFOLK REGISTRATION',
    transactionTypes: ['G2C'],
    whoMayApply: 'Fisherfolks',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Consultations and Treatment of Large and Small Animals is a veterinary support service aimed at promoting the health, productivity, and welfare of livestock and other domestic animals. This initiative provides farmers and livestock owners with professional veterinary care, including diagnosis, medical consultations, and treatment of diseases and injuries. The service covers preventive care such as vaccination, deworming, parasite control, and health monitoring, as well as curative interventions for sick or injured animals. It is implemented in coordination with the Bureau of Animal Industry and local veterinary offices to ensure proper handling, safety, and follow-up care. By providing timely consultations and treatments, the program reduces livestock mortality, enhances productivity, improves the quality of animal products, and supports the livelihoods of farmers and livestock owners.',
    endPage: 219,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 219,
    processingTime: '2 minutes; 1 hour; 4 hours',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the log-book and will be referred to the assigned Agricultural Technologist (AT)/ Agricultural Extension Worker (AEW)',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designat ed AT/ AEW. None 2 minutes Administrativ e Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Proceed to AT/ AEW assigned', number: '2.', role: 'agency' },
      {
        action:
          'Collect farmer’s informati on and set schedule for the provision of service None 1 hour to 4 hours (Depending on the location of the animal) Agricultural Technologist Agricultural Technician',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'CONSULTATIONS AND TREATMENT OF LARGE AND SMALL ANIMALS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Livestock raisers/ growers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Rabies Vaccination for Cats and Dogs is a veterinary public health program aimed at preventing the spread of rabies among domestic animals and protecting both animal and human health. This activity involves administering safe and effective rabies vaccines to cats and dogs. The program includes animal identification, vaccination, record-keeping, and education of pet owners on responsible pet care and rabies prevention. By ensuring wide coverage and proper vaccination, the initiative reduces the risk of rabies transmission, safeguards communities, and promotes public health and animal welfare.',
    endPage: 220,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 220,
    processingTime: '2 minutes; 5 minutes; 7 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook and will be referred to the assigned Agricultural Technologist (AT)/ Agricultural Extension Worker (AEW)',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designate d AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Proceed to AT/ AEW assigned', number: '2.', role: 'agency' },
      {
        action:
          'Vaccinatio n is done immediate ly if pets are brought in the office None 5 minutes Agricultural Technologist/ Agricultural Technician',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'RABIES VACCINATION TO CATS AND DOGS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Pet Owners',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Provision of Animal Health Certificate is a veterinary support service that issues official documentation certifying the health status of animals for trade, transport, or regulatory compliance. This certificate confirms that animals are free from contagious diseases and fit for movement. Through timely issuance of health certificates, the program promotes safe animal trade, prevents the spread of diseases, and supports the livelihood of farmers and traders while protecting public and animal health.',
    endPage: 221,
    fees: 'TOTAL Php130.00 12 inutes',
    office: 'Municipal Agriculture Office',
    page: 221,
    processingTime: '2 minutes; 5 minutes',
    requirements: [
      { name: 'Barangay Certification' },
      { name: 'Credentials Small Animals:' },
      { name: 'Barangay Certification' },
    ],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook and will be referred to the assigned Agricultural Technologist (AT)/ Agricultural Extension Worker (AEW)',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designate d AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Proceed to AT/ AEW assigned', number: '2.', role: 'agency' },
      {
        action: 'Advise client to pay appropriat e fees',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '0 0 5 minutes Revenue Collection Clerk, Municipal Treasurer’s Office',
        number: '130.',
        role: 'agency',
      },
      {
        action:
          'Issuance of Animal Health Certificate None 5 minutes Agricultural Technologist/ Agricultural Technician',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'PROVISION OF ANIMAL HEALTH CERTIFICATE',
    transactionTypes: ['G2C'],
    whoMayApply: 'Livestock raisers/ growers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'The Request for Trainings and Seminars on Livestock Production is a capacity-building initiative designed to enhance the knowledge and skills of livestock raisers, farmers, and farm workers. This program provides access to educational sessions on best practices in animal husbandry, nutrition, breeding, disease prevention, and sustainable livestock management. By participating in these trainings and seminars, livestock producers gain practical skills and updated knowledge, leading to improved animal health, higher productivity, and increased income opportunities.',
    endPage: 222,
    fees: 'None',
    office: 'Municipal Agriculture Office',
    page: 222,
    processingTime: '2 minutes; 20 minutes; 5 minutes; 27 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed to the Office of the Municipal Agriculturist for listing in the logbook and will be referred to the Municipal Agriculturist (MA)',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Assist client and refer to designated AT/ AEW. None 2 minutes Administrative Assistant III',
        number: '1.',
        role: 'agency',
      },
      { action: 'Proceed to MA', number: '2.', role: 'agency' },
      {
        action:
          'If funds are available and the re-quested training is feasible in the area, the re- quested training will be approved None 20 minutes Municipal Agriculturist',
        number: '2.',
        role: 'agency',
      },
      { action: 'Proceed to AT assigned', number: '3.', role: 'agency' },
      {
        action:
          'The training will be scheduled by the AT assigned None 5 minutes Agricultural Technologist/ Agricultural Technician',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'REQUEST FOR TRAININGS AND SEMINARS ON LIVESTOCK PRODUCTION',
    transactionTypes: ['G2C'],
    whoMayApply: 'Livestock raisers/ growers',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'Pre– Registration Seminar (PRS) and Coop Name Reservation are requisites for the registration of Cooperative to the Cooperative Development Authority (CDA); the office will assist the client for the PRS to be conducted by the CDA.',
    endPage: 223,
    office: 'Municipal Agriculture Office',
    page: 223,
    processingTime: '10 minutes; 5 minutes; 8 Hours; 20 minutes',
    requirements: [
      { name: 'Service Request Form' },
      { name: 'Cooperative Name Reservation Form' },
    ],
    steps: [
      {
        action: 'Fill out request form and submit to the person assigned',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1 Receive and make a simple interview about the group None 10 minutes Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '2 Contact the CDA for the Schedule of PRS None 5 minutes Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '3 Call or Contact the client for their PRS schedule None 5 minutes Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Attend the PRS on the given schedule',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '1 Assist to the conduct of the Seminar & distribute the Coop Name Reservation Form None 8 Hours Cooperatives Development Specialist II',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ASSISTANCE IN THE PRE-REGISTRATION SEMINAR',
    transactionTypes: ['G2C'],
    whoMayApply: 'Groups, Associations and Organizations',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'Cooperative Annual progress Report is a year-end report of cooperatives to be submitted to the CDA. The staff will issue forms and orient the client in accomplishing the forms and submit to the CDA. The office conducts CAPR seminar for all cooperatives in the municipality during the first quarter of the year. The personnel will assist the client in online submission of CAPR and print out the hard copy that has been submitted to CDA.',
    endPage: 224,
    office: 'Municipal Agriculture Office',
    page: 224,
    processingTime: '1 minute; 10 minutes; 2 Hours; 21 minutes',
    requirements: [
      { name: 'Service Request Form' },
      { name: 'Accomplished CAPR Form (soft and hard copy)' },
    ],
    steps: [
      {
        action: 'Fill out request form and submit to the person assigned',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1 Received the form None 1 minute Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '2 Assigned person will issue forms and orient the applicant in accomplishing None 10 minutes Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Fill out the CAPR form and submit to the person assigned',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '1 Assigned person will assist the applicant in the online Registration None 2 Hours Cooperatives Development Specialist II',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '2 Print & handover to the applicant the copies None 10 minutes Cooperatives Development Specialist II',
        number: '2.',
        role: 'agency',
      },
    ],
    title:
      'ASSISTANCE IN THE ACCOMPLISHING AND ON-LINE SUBMISSION OF THE COOPERATIVE ANNUAL PROGRESS REPORT (CAPR) TO CDA WEBSITE',
    transactionTypes: ['G2C'],
    whoMayApply: 'Groups, Associations and Organizations',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'Cooperatives and associations shall be accredited to partner-agencies for possible funding of projects and services.',
    endPage: 225,
    office: 'Municipal Agriculture Office',
    page: 225,
    processingTime: '1 minute; 10 minutes; 11 minutes',
    requirements: [
      { name: 'Service Request Form' },
      { name: 'Application Form' },
    ],
    steps: [
      {
        action: 'Fill out request form and submit to the person assigned',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1 Receive the form NONE 1 minute Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '2 Assigned person will issue forms and checklist for documentary requirements None 10 minutes Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
    ],
    title: 'ASSISTANCE FOR ACCREDITATION AS A CIVIL SOCIETY ORGANIZATION (CSO)',
    transactionTypes: ['G2C'],
    whoMayApply: 'Groups, Associations and Organizations',
  },
  {
    category: 'Agriculture and cooperatives',
    classification: 'Simple',
    description:
      'This program provides guidance and support to cooperatives in governance, management, and operations. It includes training, mentoring, and advisory services on financial management, marketing, compliance, and member engagement to improve productivity, sustainability, and access to government programs.',
    endPage: 227,
    office: 'Municipal Agriculture Office',
    page: 226,
    processingTime: '1 minute; 3 hours; 2 minutes',
    requirements: [{ name: 'Service Request Form' }],
    steps: [
      {
        action: 'Fill out request form and submit to the person assigned',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '1 Receive the form None 1 minute Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '2 Assigned person will schedule and inform the applicant of the date and venue of the technical assistance to the cooperative None 1 minute Cooperatives Development Specialist II',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Attend the Technical assistance on the given schedule',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Assist the client on the 3 hours cooperative operation in the office of the co- operative None 3 hours Cooperatives Development Specialist II',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'TECHNICAL ASSISTANCE IN COOPERATIVE OPERATIONS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Groups, Associations and Organizations',
  },
  {
    category: 'Property assessment',
    classification: 'Highly Technical',
    description:
      'The Issuance of Tax Declaration for Lands is a service provided by the Municipal Assessor’s Office to officially record property ownership and valuation for taxation purposes. By submitting the required documents such as proof of ownership and survey plans, citizens can obtain a Tax Declaration that serves as the basis for real property tax assessment, ensuring accurate records and supporting local revenue generation.',
    endPage: 229,
    office: 'Municipal Assessor’s Office',
    page: 228,
    processingTime:
      '10 minutes; 45 minutes; 30 minutes; 5 minutes; 1 hour; 40 minutes',
    requirements: [
      {
        name: 'A survey plan prepared by duly Licensed Geodetic Engineer duly approved by the Land Management Bureau of DENR (2 original copies)',
      },
      {
        name: 'A certification that the land is within the Alienable and Disposable area (2 original copies)',
      },
      {
        name: 'An affidavit of ownership and/or Sworn Statement declaring the market value of the property filed by the owner/administrator; the applicant is in long, continuous and notorious possession of the property (2 original copies)',
      },
      {
        name: 'Certification that the declarant is the present possessor and occupant of the land (2 original copies)',
      },
      { name: 'An ocular inspection/investigation report' },
      { name: 'Real Property tax For titled properties:' },
      { name: 'E-copy of Title (1 original copy & 1 photocopy)' },
      { name: 'Approved subdivision plans if subdivided (2 original copies)' },
      {
        name: 'Original/E-copy of Deed of conveyance (1 original copy & 1 photocopy)',
      },
      { name: 'Original/E-copy of CAR- Certificate Authorizing' },
    ],
    steps: [
      { action: 'Submit documents', number: '1.', role: 'agency' },
      {
        action:
          'Receive and verify submitted documents. NONE 10 minutes Local Assessment Operation officer (LAOO-I) Assessment clerk II Municipal Assessor Draftsman I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          '2 Appraise & assess the valuation of the property. 45 minutes Local Assessment Operation officer (LAOO-I) Municipal Assessor',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Pay the required fee at the Municipal Treasurer’s Office',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Issue OR 2% of the Assessed Value of the property 10 minutes Revenue collection Clerk I Local Revenue Collection Officer II Municipal Treasurer’s Office',
        number: '2.',
        role: 'agency',
      },
      { action: 'Submit receipt & documents', number: '3.', role: 'agency' },
      {
        action:
          '1 Encode Data None 30 minutes Local Assessment operation officer I / Assessment clerk II / Municipal Assessor',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          '2 Endorse for approval by the Municipal Assessor to PAO None 9 working days Municipal Assessor The Provincial Assessor',
        number: '3.',
        role: 'agency',
      },
      { action: 'Receive tax declaration', number: '4.', role: 'agency' },
      {
        action:
          'Release approved tax declarations None 5 minutes Local Assessment operation officer I Assessment clerk II / Draftsman I',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF TAX DECLARATION FOR LANDS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Property owners within the municipality',
  },
  {
    category: 'Property assessment',
    classification: 'Highly Technical',
    description:
      'This issued as reference for paying their taxes and see to it that their building is appraised, assessed and accounted on the tax map control roll for taxation purpose.',
    endPage: 231,
    fees: 'Php',
    office: 'Municipal Assessor’s Office',
    page: 230,
    processingTime:
      '30 minutes; 1 day; 10 minutes; 5 minutes; 10 days; 1 hour; 50 minutes',
    requirements: [
      { name: 'A.1)' },
      {
        name: 'Copy of the approved building permit, building plan or Certificate of Occupancy (2 photocopies)',
      },
      { name: 'Ocular inspection of the property' },
      {
        name: 'Accomplished Affidavit of Ownership or Sworn Statement of the market value (2 original copy)',
      },
    ],
    steps: [
      { action: 'Make necessary request.', number: '1.', role: 'agency' },
      {
        action:
          '1 Interview, verify records None 30 minutes Local Assessment operation officer I / Assessment clerk II / Draftsman I/ Bookbinder I',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Conduct ocular inspection of the property Php',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          '00 1 day Local Assessment operation officer I / Assessment clerk II / Draftsman I/ Bookbinder I',
        number: '500.',
        role: 'agency',
      },
      {
        action:
          '3 Appraise & assess the valuation of property None 30 minutes Local Assessment operation officer I / Municipal Assessor ￼',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Pay required fee 2. Issue official receipt 2% of the Assessed Value of the property 10 minutes Revenue Collection Clerk/ Local Revenue Collection officer II Municipal Treasurer’s Office',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Submit receipt with complete documents',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          '1 Receive receipt papers None 5 minutes Local Assessment operation officer I / Assessment clerk II / Draftsman I/ Bookbinder I',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          '2 Examine, review & verify documents & encode tax declaration None 30 minutes Local Assessment operation officer I / Assessment clerk II / Draftsman I/ Bookbinder I',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          '3 Endorse for approval by the Mun. Assessor to Provincial Assessor’s Office None 9 working days Municipal Assessor Provincial Assessor',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Receive the tax declaration with notice of assessment attached',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Release documents None 5 minutes Assessment clerk II / Draftsman I',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'REQUEST FOR ISSUANCE OF TAX DECLARATION FOR BUILDING',
    transactionTypes: ['G2C'],
    whoMayApply: 'Property owners within the municipality',
  },
  {
    category: 'Property assessment',
    classification: 'Simple',
    description:
      'This issued as reference and requirement to other offices for transactions and bail bond.',
    endPage: 233,
    fees: 'Php; TOTAL Php180.00 1 hour',
    office: 'Municipal Assessor’s Office',
    page: 232,
    processingTime: '20 minutes; 10 minutes; 5 minutes; 1 hour',
    requirements: [
      { name: 'Tax Declaration Number to be certified' },
      { name: 'Official Receipt' },
    ],
    steps: [
      { action: 'Make necessary request', number: '1.', role: 'agency' },
      {
        action:
          'Verify records None 20 minutes Municipal Assessor / Local Assessment Operation Officer I',
        number: '1.',
        role: 'agency',
      },
      { action: 'Pay required fee', number: '2.', role: 'agency' },
      { action: 'Issue Official Receipt Php', number: '2.1.', role: 'agency' },
      {
        action:
          '00 10 minutes Revenue Collection Clerk, Municipal Treasurer’s Office',
        number: '180.',
        role: 'agency',
      },
      {
        action:
          'Receive receipt & prepare documents None 20 minutes Local Assessment Operation Officer I / Assessment Clerk II / Municipal Assessor',
        number: '2.3.',
        role: 'agency',
      },
      {
        action:
          'Verify and sign prepared documents None 5 minutes Municipal Assessor/ Local Assessment Operation Officer I ￼',
        number: '2.3.',
        role: 'agency',
      },
      {
        action:
          'Receive copy of tax declaration 3. Release papers None 5 minutes Local Assessment Operation Officer I / Assessment Clerk II / Municipal Assessor',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFIED TRUE COPY OF TAX DECLARATION',
    transactionTypes: ['G2C'],
    whoMayApply: 'Property owners within the municipality',
  },
  {
    category: 'Property assessment',
    classification: 'Simple',
    description:
      'Issued to determine all the properties of an individual within the municipality as reference and basis of concerned agencies specially the (BIR).',
    endPage: 235,
    fees: 'Php230.00 10 minutes; TOTAL Php230.00 1 hour &',
    office: 'Municipal Assessor’s Office',
    page: 234,
    processingTime: '20 minutes; 10 minutes; 15 minutes; 5 minutes; 1 hour',
    requirements: [
      { name: 'Complete Name and Address of an individual' },
      { name: 'Official Receipt' },
    ],
    steps: [
      { action: 'Make necessary request', number: '1.', role: 'agency' },
      {
        action:
          'Conduct interview & records None 20 minutes Local Assessment Operation officer I / Assessment Clerk II / Municipal Assessor',
        number: '1.',
        role: 'agency',
      },
      { action: 'Pay the required fee', number: '2.', role: 'agency' },
      {
        action:
          'Issue Official. Php230.00 10 minutes Revenue Collection Clerk, Municipal Treasurer’s Office',
        number: '2.1.',
        role: 'agency',
      },
      {
        action:
          '2 Receipt, receive receipt & prepare documents None 15 minutes Local Assessment Operation officer I / Assessment Clerk II / Municipal Assessor',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          '3 Verify & sign prepared documents None 20 minutes Local Assessment Operation Officer I / Assessment Clerk II / Municipal Assessor ￼',
        number: '2.',
        role: 'agency',
      },
      { action: 'Receive certification', number: '3.', role: 'agency' },
      {
        action:
          'Release certification None 5 minutes Local Assessment Operation Officer I / Assessment clerk II',
        number: '3.',
        role: 'agency',
      },
    ],
    title:
      'ISSUANCE OF CERTIFICATION OF PROPERTY LANDHOLDING/CERTIFICATE OF NO PROPERTY LANDHOLDINGS',
    transactionTypes: ['G2C'],
    whoMayApply: 'Property owners within the municipality',
  },
  {
    category: 'Property assessment',
    classification: 'Simple',
    description:
      'Issued as reference for locating properties and for loan purposes.',
    endPage: 238,
    fees: 'Php; TOTAL Php800.00 1 hour & 5',
    office: 'Municipal Assessor’s Office',
    page: 236,
    processingTime: '20 minutes; 10 minutes; 15 minutes; 1 hour; 5\nminutes',
    requirements: [
      { name: 'Lot number and location of the property' },
      { name: 'Official Receipt' },
    ],
    steps: [],
    title: 'ISSUANCE OF CERTIFIED TAX MAP',
    transactionTypes: ['G2C'],
    whoMayApply: 'Property owners within the municipality',
  },
  {
    category: 'Budget and appropriations',
    classification: 'Simple/External',
    description:
      'Certifies that disbursements are within the approved appropriations.',
    endPage: 240,
    office: 'Municipal Budget Office',
    page: 239,
    processingTime: '5 minutes; 2 minutes; 9 minutes',
    requirements: [
      {
        name: 'Approved request letter or verbal request at the Municipal Budget Office',
      },
    ],
    steps: [
      {
        action:
          'Directly submit approved request letter or make verbal request to the office of the Municipal Budget Office',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive request then verify on available data on records None 5 minutes Administrative Aide I/ Budgeting Assistant/ Budget Officer II',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Secure signature of the Municipal Budget Officer None 2 minutes Administrative Aide I/ Budgeting Assistant/ Budget Officer II Mun. Budget Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Receive the permit and sign in the receiving copy. 2. Issue the certification None 2 minutes Administrative Aide I/ Budgeting Assistant/ Budget Officer II',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFICATION ON BUDGETING AND APPROPRIATION',
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply:
      'Barangay Council, Local Schools under the Special Education Fund',
  },
  {
    category: 'Budget and appropriations',
    classification: 'Simple/Internal',
    description:
      'The Obligation Request is a pre-requisite in payment of claims. This is to certify the availability of appropriation/allotment and funds obligated for a certain purpose by the Municipal Budget Officer.',
    endPage: 243,
    office: 'Municipal Budget Office',
    page: 241,
    processingTime: '2 minutes; 8 minutes',
    requirements: [],
    steps: [],
    title: 'PROCESSING OF OBLIGATION REQUEST',
    transactionTypes: ['G2G'],
    whoMayApply: 'All offices of the Local Government Unit of Lal-lo',
  },
  {
    category: 'Accounting services',
    classification: 'Simple',
    description:
      'The account’s advice is issued to the Authorized Government Depository bank as a proof that all checks issued are complete with documentary requirements.',
    endPage: 245,
    office: 'Municipal Accounting Office',
    page: 244,
    processingTime: '5 minutes; 10 minutes; 35 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Submit disbursement voucher with signed & countersigned check.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and compare the name of the payee in the disbursement voucher with the name of payee in the check. None 5 minutes Administrative Aide V',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Encode data in computer. None 10 minutes Administrative Aide I',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Review accuracy of entry in the Accountant’s Advice and affix signature. None 10 minutes Municipal Accountant',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          'Approve the Accountant’s Advice encoded via LBPweaccess facility. None 5 minutes Municipal Accountant ￼',
        number: '1.4.',
        role: 'agency',
      },
      {
        action:
          'Transmit the disbursement voucher with the check to the Municipal Treasurer’s Office. None 5 minutes Administrative Aide I',
        number: '1.5.',
        role: 'agency',
      },
    ],
    title: 'ACCOUNTANT’S ADVICE OF CHECK ISSUED',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Government & Private Clients CHECKLIS OF REQUIREMENTS 1. Approved Disbursement Voucher 2. Authorized Check WHERE TO SECURE Municipal Treasurer’s Office',
  },
  {
    category: 'Accounting services',
    classification: 'Simple',
    description:
      'Taxes on purchases are withheld pursuant to National Internal Revenue Code. The Certificate of Taxes Withheld is provided to show proof that taxes due has been paid.',
    endPage: 246,
    office: 'Municipal Accounting Office',
    page: 246,
    processingTime: '10 minutes; 5 minutes; 3 minutes; 23 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Proceed at the Municipal Accounting Office to verbally request for the issuance of Bureau of Internal Revenue (BIR) Form 2307 or Certificate of Tax Withheld.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Verify the validity of transaction in the Subsidiary Ledger (Due to BIR) None 10 minutes Administrative Aide IV',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Encode data in computer. None 5 minutes Administrative Aide IV',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Review accuracy of entry in the BIR Form and affix signature None 5 minutes Municipal Accountant',
        number: '1.3.',
        role: 'agency',
      },
      {
        action:
          'Record in the logbook for monitoring purposes and release the certificate. None 3 minutes Administrative Aide IV',
        number: '1.4.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFICATE OF TAXES WITHHELD',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Government & Private Clients CHECKLIS OF REQUIREMENTS 1. Valid ID/Letter of Authorization, if representative. WHERE TO SECURE Availing client.',
  },
  {
    category: 'Accounting services',
    classification: 'Simple',
    description:
      'This service provides employees with an official certification of their Net Take Home Pay (NTHP), which reflects the amount remaining after all authorized deductions from their salary. The certificate is typically required for purposes such as loan applications, financial transactions, or compliance with government regulations.',
    endPage: 248,
    fees: 'None',
    office: 'Municipal Accounting Office',
    page: 247,
    processingTime: '5 minutes; 3 minutes; 16 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Client shall proceed at the Municipal Accounting office to request for the certificate of Net Take Home Pay (NTHP).',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Verify from the payroll. None 5 minutes Computer Programmer I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action: 'Encode data in computer. None 5 minutes Computer Programmer I',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Review the accuracy of entry and affix signature. None 3 minutes Municipal Accountant',
        number: '1.3.',
        role: 'agency',
      },
      { action: 'Receive the certificate.', number: '2.', role: 'agency' },
      {
        action: 'Release the certificate None 3 minutes Computer Programmer I',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFICATE OF NET TAKE HOME PAY',
    transactionTypes: ['G2G'],
    whoMayApply:
      'Local Government Unit of Lal-lo officials and employees. CHECKLIS OF REQUIREMENTS None WHERE TO SECURE',
  },
  {
    category: 'General services',
    classification: 'Simple',
    description:
      'Vehicles/Chairs/Tables/Tents/ Supplies Upon Request and Approval of the LCE This service allows constituents, offices, or organizations to request the temporary use of government-owned service vehicles, furniture, tents, and other supplies for official, community, or special activities. Requests are subject to the approval of the Local Chief Executive (LCE) to ensure proper allocation, accountability, and prioritization of resources.',
    endPage: 249,
    office: 'Municipal General Services Office',
    page: 249,
    processingTime: '10 minutes; 35 minutes',
    requirements: [{ name: 'Approved Letter of Request' }],
    steps: [
      {
        action: 'Transmit request approved letter by the Mayor',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive request, record in logbook and forward to the Municipal General Services Office None 10 minutes Administrative Aide I',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Receive feedback on the request',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Inform action taken on the request and arrange schedule. None 10 minutes Municipal General Services Officer',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Receive requested facility/service/s upply',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issuance of Certificate of Award to supplies granted by the LGU. None 10 minutes Supply Officer I',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'PROVISION OF REQUESTED FACILITIES',
    transactionTypes: ['G2C', 'G2G'],
    whoMayApply:
      'Barangays, Educational Institution National Government Agencies, Civil Society Organization in the municipality, Residents of the municipality',
  },
  {
    category: 'General services',
    classification: 'Simple',
    description:
      'This service ensures the availability of essential supplies and equipment to support official functions, community activities, and organizational needs within the locality.',
    endPage: 250,
    office: 'Municipal General Services Office',
    page: 250,
    processingTime:
      '10 minutes; 3 days; 10 days; 20 minutes; 5 minutes; 35 minutes',
    requirements: [{ name: 'Approved Purchase Request' }],
    steps: [
      {
        action:
          'Prepare & submit Purchase Request certified by Municipal Budget Officer & approved by Mayor.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Check items on the approved purchase request. None 10 minutes Municipal General Services Officer',
        number: '1.1.',
        role: 'agency',
      },
      {
        action: 'If stock is available. None 3 days Supply Officer I',
        number: '1.2.',
        role: 'agency',
      },
      {
        action: 'If no stock available. None 10 days',
        number: '1.3.',
        role: 'agency',
      },
      { action: 'Accept requested supplies.', number: '2.', role: 'agency' },
      {
        action: 'Release items requested. None 20 minutes Supply Officer I',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Sign acknowledgement receipt/logbook.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'File acknowledge ment receipt for monitoring purposes. None 5 minutes Supply Officer I',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'PROVISION OF SUPPLIES AND EQUIPMENTS',
    transactionTypes: ['G2G'],
    whoMayApply: 'Local Government Unit of Lal-lo Offices',
  },
  {
    category: 'General services',
    classification: 'Simple',
    description:
      'This service facilitates the issuance and processing of trip tickets and gas withdrawal slips to ensure proper authorization, monitoring, and accountability in the use of government vehicles and fuel resources.',
    endPage: 252,
    office: 'Municipal General Services Office',
    page: 251,
    processingTime: '3 minutes; 5 minutes; 16 minutes',
    requirements: [],
    steps: [
      {
        action:
          'Submit trip ticket with signature of the department head concerned.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive the signed trip ticket None 3 minutes Administrative Aide I',
        number: '1.',
        role: 'agency',
      },
      {
        action: 'Present the trip ticket and requisition slip for fuel.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Review entries for requested fuel. None 5 minutes Municipal General Services Officer',
        number: '2.1.',
        role: 'agency',
      },
      {
        action:
          'Issue the withdrawal slip with the corresponding quantity of requested fuel. None 3 minutes Municipal General Services Officer',
        number: '2.2.',
        role: 'agency',
      },
      {
        action: 'Receive a copy of the trip ticket and gas slip.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Release copy of trip ticket and gas slip. None 3 minutes Administrative Aide I',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'PROCESSING OF TRIP TICKET AND GAS WITHRAWAL SLIPS',
    transactionTypes: ['G2G'],
    whoMayApply: 'Local Government Unit of Lal-lo Offices',
  },
  {
    category: 'Social welfare',
    classification: 'Simple',
    description:
      'Issued to Solo Parent as defined by Republic Act 11861: Expanded Solo Parents Welfare Act.',
    endPage: 254,
    fees: 'None',
    office: 'Municipal Social Welfare and Development Office',
    page: 253,
    processingTime:
      '5 minutes; 10 minutes; 2 minutes; 15 minutes; 3 minutes; 35 minutes; 3 months',
    requirements: [
      { name: 'For documentary requirements please see Annex A.' },
    ],
    steps: [
      {
        action: 'Present requirements and log-in at the logbook.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Review requirements and conduct interview to client. None 5 minutes Administrative Aide I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Upon verification of completeness of requirements and eligibility of applicant, proceed to filling up of Application Form. 10 minutes Administrative Aide I',
        number: '3.2.',
        role: 'agency',
      },
      {
        action: 'Fill up the Application form and submit upon completion.',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Receive the form from the client. None 2 minutes Administrative Aide I',
        number: '2.1.',
        role: 'agency',
      },
      {
        action: 'Prepare the Solo Parent ID 15 minutes Administrative Aide I',
        number: '2.4.',
        role: 'agency',
      },
      {
        action: 'Issuance of ID and sign on the logbook',
        number: '3.',
        role: 'agency',
      },
      {
        action: 'Issuance of ID to client None 3 minutes Administrative Aide I',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF SOLO PARENT ID',
    transactionTypes: ['G2C'],
    whoMayApply: 'Solo Parent (as defined by RA 11861)',
  },
  {
    category: 'Social welfare',
    classification: 'Simple',
    description:
      'This program provides immediate financial support to individuals and families who are experiencing crisis situations such as illness, hospitalization, death of a family member, natural disasters, or other emergencies. Assistance may cover medical expenses, burial costs, transportation, food, or other urgent needs. The service aims to help affected citizens cope with unexpected hardships and ensure timely relief through accessible and compassionate government support.',
    endPage: 257,
    office: 'Municipal Social Welfare and Development Office',
    page: 255,
    processingTime: '15 minutes; 3 hours; 30 minutes; 4 hours',
    requirements: [
      {
        name: 'For Medical Assistance A.) Barangay Certification of indigency— original B.) Medical Certificate duly signed by attending physician—original C.) Community Tax Certificate (CEDULA) – original D.) Police Blotter (for Dog bite only) - original or photocopy',
      },
      {
        name: 'For Emergency Shelter Assistance (ESA) A.) Barangay Certification & Indigency duly signed by the Barangay Captain—original B.) Attached photo document of damaged house C.) Community Tax Certificate (CEDULA) – original',
      },
      {
        name: 'For Fire Victims A) Barangay Certification & Indigency duly signed by the Barangay Captain—original B.) Attached photo document of damaged house C.) Community Tax Certificate (CEDULA) –',
      },
    ],
    steps: [
      {
        action:
          'Proceed at the Office of the Municipal Social Welfare and Development and present necessary requirements',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge documents. None 15 minutes Administrative Aide I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Conduct Interview, assessment and evaluation in order to prepare eligibility for the assistance.',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Process documents and be signed by None 3 hours & 30 minutes Administrative Aide I Municipal ￼ the designated signatories. Budget Officer Municipal Accountant Local Chief Executive/Acting Mayor/OIC Mayor/Municipal Administrator',
        number: '1.3.',
        role: 'agency',
      },
      { action: 'Receive cash or check', number: '2.', role: 'agency' },
      {
        action:
          'Release cash or check (if grant is amounting to P5,000.00 and above) None 15 minutes Disbursing Officer Municipal Treasurer’s Office',
        number: '2.',
        role: 'agency',
      },
    ],
    title:
      'PROVISION OF FINANCIAL ASSISTANCE TO INDIVIDUALS IN CRISIS SITUATION (AICS)',
    transactionTypes: ['G2C'],
  },
  {
    category: 'Social welfare',
    classification: 'Simple',
    description:
      'This service provides an official certification to residents of the municipality who are identified as indigent, confirming their financial status for purposes such as medical assistance, educational support, legal aid, or other government and private programs. The certificate serves as proof of indigency and helps qualified individuals access social services and benefits intended for low-income citizens.',
    endPage: 260,
    fees: 'None',
    office: 'Municipal Social Welfare and Development Office',
    page: 258,
    processingTime: '2 minutes; 5 minutes; 3 minutes; 15 minutes',
    requirements: [
      { name: 'Barangay Certificate of Indigency— original' },
      { name: 'Community Tax Certificate (CEDULA) - original' },
      { name: '1 Photocopy of Valid ID (for verification purposes)' },
    ],
    steps: [
      {
        action:
          'Proceed at the Office of the Municipal Social Welfare and Development and present necessary requirements.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge documents. None 2 minutes Administrative Aide I',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Conduct assessment and review of necessary documents 5 minutes Administrative Aide I',
        number: '2.3.',
        role: 'agency',
      },
      {
        action:
          'Process documents and be signed by the designated signatories. None 5 minutes Administrative Aide I / Municipal Social Welfare and Development Officer ￼',
        number: '1.3.',
        role: 'agency',
      },
      {
        action: 'Releasing of Certificate of Indigency',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Releasing of certificate and sign in the logbook None 3 minutes Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
    ],
    title: 'ISSUANCE OF CERTIFICATE OF INDIGENCY',
    transactionTypes: ['G2C'],
  },
  {
    category: 'Engineering and building permits',
    classification:
      'Complex Type of Transaction: G2C – Government to Client G2B – Government to Business G2G – Government to Government',
    description:
      'This service provides the official approval to construct, renovate, repair, or demolish a building or structure. It ensures that the project follows the National Building Code of the Philippines and local regulations, making sure construction is safe, legal, and properly planned before work begins.',
    endPage: 263,
    office: 'Municipal Engineering Office',
    page: 261,
    processingTime: '10 minutes; 1 day; 3 days; 5 days; 20 minutes',
    requirements: [
      { name: 'Building Permit Forms (4 copies)' },
      { name: 'Four (4) sets of Detailed Plans' },
      {
        name: 'For construction of more than two storey building: -Structural Design Analysis – signed and sealed by Civil Engineer at every page',
      },
      {
        name: 'For construction of more than two-storey building: -Boring and Plate Load Test -Seismic Analysis',
      },
      {
        name: 'Proof of Property -Photocopy of Transfer Certificate of Title (TCT) -Photocopy of Tax Declaration of Property-lot (Certified True Copy) – 4 copies -Photocopy of Current Tax Receipt (4 copies)',
      },
      {
        name: 'If property is not registered under the name of the applicant: -Submit 4 copies of any of the following: -Contract of Lease -Contract of Sale -Affidavit of Consent of the Lot Owner for the construction of building/house -Deed of Absolute Sale',
      },
      { name: 'Permit Billboard (0.60 x 0.90)' },
    ],
    steps: [
      { action: 'Submission of documents', number: '1.', role: 'agency' },
      {
        action:
          'Receive and assess the documents None 10 minutes Engineer III / Engineer I / Draftsman I',
        number: '1.',
        role: 'agency',
      },
      { action: 'Join the Site Inspection', number: '2.', role: 'agency' },
      {
        action:
          'Conduct Inspection None 1 day Engineer III / Engineer I / Draftsman I',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Wait for the feedback of the inspection team.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Evaluate the submitted building plans specifications and assess the changes and fees None 3 days Engineer III / Engineer I / Draftsman I',
        number: '3.',
        role: 'agency',
      },
      { action: 'Payment of required fees', number: '4.', role: 'agency' },
      {
        action:
          'Compute required fees to be paid and issue Official Receipt. See Annex A: New Schedule of Fees and Other Charges of the Revised Implementing Rules and Regulations (IRR) of the National Building Code of the Philippines (PD 1096) 10 minutes Revenue Collection Clerk (Municipal Treasurer’s Office) ￼',
        number: '4.',
        role: 'agency',
      },
      { action: 'Claim Building permit', number: '5.', role: 'agency' },
      {
        action:
          'Release of duly signed Bldg. Permit None 1 day Engineer III / Engineer I / Draftsman I Municipal Engineer',
        number: '5.',
        role: 'agency',
      },
    ],
    title: 'APPLICATION OF BUILDING PERMIT',
    transactionTypes: [],
    whoMayApply:
      'Any person, firm or corporation, including any agency or instrumentality of the government who wants to construct, alter, repair, move, convert, demolish or add any building or structure or any portion thereof within the territorial jurisdiction of the Municipality of Lal-lo.',
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      'Document issued to an individual/permittee after submission of duly notarize Certificate of completion together with construction logbook and as built plan and specification.',
    endPage: 265,
    office: 'Office of the Municipal Engineer',
    page: 264,
    processingTime: '1 day; 5 minutes; 10 minutes',
    requirements: [
      { name: '3 copies of Certificate of Completion, duly notarized' },
      {
        name: 'Construction Logbook, signed and sealed by the Owners Architect or Civil Engineer who undertook full-time inspection and supervision,',
      },
      {
        name: 'As-built Plans, signed and sealed by the Owners Architect or Civil Engineer who undertook full-time inspection and supervision,',
      },
      {
        name: '1 photocopy of the valid licenses of all involved Professionals,',
      },
      {
        name: 'Captioned photographs of Site and Completed Building/Structure showing front, sides, and rear areas, 6. Yellow Card issued by the Electric Service Provider; FSIC from BFP',
      },
    ],
    steps: [
      { action: 'Submission of documents', number: '1.', role: 'agency' },
      {
        action:
          'Review and assess the documents None 1 day Engineer III / Engineer I / Draftsman I',
        number: '1.',
        role: 'agency',
      },
      { action: 'Payment of required fees', number: '2.', role: 'agency' },
      {
        action:
          'Compute required fees to be paid See Annex A: New Schedule of Fees and Other Charges of the Revised Implementing Rules and Regulations (IRR) of the National Building Code of the Philippines (PD 1096) 5 minutes Engineer III / Engineer I / Draftsman I ￼',
        number: '2.',
        role: 'agency',
      },
      { action: 'Claiming of Occupancy', number: '3.', role: 'agency' },
      {
        action:
          'Release of duly signed Occupancy Permit None 5 minutes Engineer III / Engineer I / Draftsman I Municipal Engineer',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'APPLICATION FOR OCCUPANCY PERMIT',
    transactionTypes: ['G2C'],
    whoMayApply: 'Owners of completed structures or establishments',
  },
  {
    category: 'Mayor and municipal services',
    classification: 'Simple',
    description:
      'This service allows applicants to secure an Electrical Permit for the installation, alteration, or repair of electrical systems to ensure compliance with the Philippine Electrical Code and applicable safety standards. The permit is issued upon submission and evaluation of complete requirements in accordance with RA 11032 (Ease of Doing Business and Efficient Government Service Delivery Act).',
    endPage: 285,
    fees: 'None',
    office: 'Office of the Municipal Engineer',
    page: 266,
    processingTime: '2.5 days; 5 minutes; 10 minutes',
    requirements: [
      { name: '3 copies of electrical plan' },
      { name: 'Zoning clearance' },
      { name: '3 copies of electrical form' },
      { name: 'Fire Safety Inspection Certificate (F-SIC)' },
    ],
    steps: [
      { action: 'Submission of documents', number: '1.', role: 'agency' },
      {
        action: 'Review and assess the documents None',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          '5 days Engineer I Draftsman I Administrative Aide IV (Electrician I)/ Engineer III Engineer II- Designate',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Payment of required fees and charges',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Compute required fees to be paid See Annex A: New Schedule of Fees and Other Charges of the Revised Implementing Rules and Regulations (IRR) of the National Building Code of the Philippines (PD 1096) 5 minutes Engineer I Draftsman I Administrative Aide IV (Electrician I)/ Engineer III ￼',
        number: '2.',
        role: 'agency',
      },
      { action: 'Claim the Electrical permit', number: '3.', role: 'agency' },
      {
        action:
          'Release of duly signed Occupancy Permit None 5 minutes Engineer I Draftsman I Administrative Aide IV (Electrician I) Municipal Engineer',
        number: '3.',
        role: 'agency',
      },
    ],
    title: 'APPLICATION FOR ELECTRICAL PERMIT',
    transactionTypes: ['G2C'],
    whoMayApply: 'Owners of completed structures or establishments',
  },
  {
    category: 'Tourism services',
    classification: 'Simple',
    description:
      'The Municipal Tourism Office supports various local and national events; the team is in- charge of the physical arrangement for the programs and activities of the municipality and different barangays through the provision of venue (tourism/LGU facilities) for conduct of various activities.',
    endPage: 289,
    fees: '4. WITH AIRCON 16 UNITS ₱3,000.00/hr ₱3,500.00/hr; 8 UNITS ₱2,500.00/hr ₱3,000.00/hr; FAN (CEILING) 2 UNITS ₱2.000/00/hr ₱2.500.00/hr; & FAN ₱1,700.00/hr ₱2,300.00/hr; FUNCTION ROOM ₱1,000.00/hr; ₱200.00/monthly (with free 8hrs); ₱100.00/4hrs (In Excess of 8hrs free); ₱100.00/hr; ₱2,000.00; ₱50.00; 1. WITH AIRCON 16 UNITS ₱3,500.00/hr ₱4,000.00/hr; 8 UNITS ₱3,000.00/hr ₱3,500.00/hr; FAN (CEILING) 2 UNITS ₱2.500/00/hr ₱2.700.00/hr; 3. WITHOUT AIRCON ₱2,200.00/hr ₱2,700.00/hr; 3 PAX ₱700.00/ each; 4 PAX ₱500.00/ each; HOTEL TYPE ROOM ₱1,800.00/ day; LED WALL ₱10,000/ 4hrs; LIGHTS & SOUNDS ₱8,000/ 4hrs; 1. Electricity for LED WALL ₱2,500/ 4hrs; ₱2,500/4hrs; 3. IN-EXCESS OF 4 HRS ₱500.00/hr; 4. ROOF DECK ₱1,000.00/hr; 5. STALLS ₱8,000.00/month',
    office: 'Municipal Tourism Office',
    page: 286,
    processingTime: '10 minutes; 5 minutes; 35 minutes; 2 HOURS',
    requirements: [
      { name: 'Approved Request Letter' },
      { name: 'Order of Payment (Non-government clients)' },
      { name: 'Official Receipt' },
    ],
    steps: [
      {
        action: 'Fill up request form at the Municipal Tourism Office',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive and acknowledge accomplished request form NONE 10 minutes Administrative Aide I/ Municipal Tourism Officer',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Review request form NONE 5 minutes Administrative Aide I/ Municipal Tourism Officer',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Client shall present their intent to conduct certain activity and seek confirmation of',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Verification of the availability and schedule for the desired date, venue and NONE 5 minutes Administrative Aide I ￼ the schedule. amenities as requested.',
        number: '2.1.',
        role: 'agency',
      },
      {
        action:
          'Issuance of Order of Payment from the Tourism Office if desired venue has prescribed fees to be paid prior to utilization. None 5 minutes Administrative Aide I',
        number: '2.2.',
        role: 'agency',
      },
      {
        action:
          'Proceed to payment at the Treasury Office. * This step can be skipped if no fees posted for utilization of venue is required.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Issue the Official Receipt See Annex xx 5 minutes Revenue Collection Clerk Municipal Treasurer’s Office',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Confirmation of request and availment of the service as per schedule and venue.',
        number: '4.',
        role: 'agency',
      },
      {
        action:
          'Schedule shall be finalized and posted in the calendar of activities. NONE 5 minutes Administrative Aide I',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'PROVISION OF TOURISM/LGU FACILITIES',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Barangays, Educational Institution National Government Agencies, Civil Society Organization in the municipality, Business Owners, Residents of the municipality',
  },
  {
    category: 'Tourism services',
    classification: 'Simple',
    description:
      'This service offers a safe, enjoyable, and educational river cruise experience, it also highlights the natural beauty, cultural heritage, and historical significance of the Cagayan River while promoting eco-tourism and local community development.',
    endPage: 292,
    office: 'Municipal Tourism Office',
    page: 290,
    processingTime: '10 minutes; 40 minutes',
    requirements: [
      { name: 'Approved Request Letter' },
      { name: 'Passenger Manifest Form' },
    ],
    steps: [
      {
        action:
          'Submit request letter to the Office of the Mayor and secure approval.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive request letter and forward for Mayor’s action. None 10 minutes Administrative Aide I Office of the Mayor Mayor/Acting Mayor/OIC Mayor',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Upon approval of request, inform client of the action taken and arrange schedule None 10 minutes Administrative Aide I',
        number: '2.',
        role: 'agency',
      },
      {
        action: 'Fill up the Passenger Manifest Form',
        number: '2.',
        role: 'agency',
      },
      {
        action:
          'Inform the MB Nueva Segovia Crew of None 10 minutes Administrative Aide I/ Municipal Tourism Officer ￼ the schedule and instruct to prepare for the tour.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'Client proceeds to the MB Nueva Segovia Dock Area on the agreed schedule.',
        number: '3.',
        role: 'agency',
      },
      {
        action:
          'MB Nueva Segovia Crew will provide the safety procedures for the tour. None 10 minutes MB Nueva Segovia Crew',
        number: '4.',
        role: 'agency',
      },
    ],
    title: 'TOUR AT THE CAGAYAN RIVER',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Barangays, Educational Institution National Government Agencies, Civil Society Organization in the municipality, Business Owners, Residents of the municipality',
  },
  {
    category: 'Municipal administration',
    classification: 'Simple',
    description:
      'This service involves the systematic review, consolidation, and endorsement of reports and recommendations submitted by municipal departments to the Local Chief Executive (Mayor). It ensures that all reports are accurate, timely, and aligned with local government priorities before being elevated for executive action.',
    endPage: 294,
    office: 'Municipal Administrator’s Office',
    page: 293,
    processingTime: '5 minutes; 50 minutes; 1 hour',
    requirements: [
      {
        name: 'PPA details (with cover letter signed by the Department Head and other documents as necessary for validation',
      },
    ],
    steps: [
      {
        action: 'Submit Request Letter/documents/Proposals, etc.',
        number: '1.',
        role: 'agency',
      },
      {
        action:
          'Receive all necessary documents, with special attention to the date of completion of the report None 5 minutes Administrative Aide I/ Municipal Administrator',
        number: '1.1.',
        role: 'agency',
      },
      {
        action:
          'Review the documents. Draft recommendations based on the findings. None 50 minutes Administrative Aide I/ Municipal Administrator',
        number: '1.2.',
        role: 'agency',
      },
      {
        action:
          'Start the process of endorsing the documents by having the recommendation reviewed and None 5 minutes Administrative Aide I/ Municipal Administrator ￼ signed by the Municipal Administrator, and endorse to the Mayor',
        number: '1.3.',
        role: 'agency',
      },
    ],
    title:
      'MONITORING AND ENDORSEMENT OF DEPARTMENT REPORTS AND RECOMMENDATIONS TO THE LOCAL CHIEF EXECUTIVE',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Barangays, Educational Institution National Government Agencies, Civil Society Organization in the municipality',
  },
  {
    category: 'Municipal administration',
    classification: 'Simple',
    description:
      'This service ensures that meetings related to city government programs, projects, services, and activities are properly supervised, facilitated, and attended by authorized personnel. It guarantees that discussions are documented, decisions are endorsed, and actions are aligned with the city’s development priorities.',
    endPage: 296,
    office: 'Municipal Administrator’s Office',
    page: 295,
    processingTime: '5 minutes; 1 hour; 10 minutes; 15 minutes',
    requirements: [
      {
        name: 'Details of the programs, projects and activities (PPA) must be attached along with a cover letter signed by the Department Head; for meetings, official invitations must be attached; other documents as necessary for validation.',
      },
    ],
    steps: [
      {
        action:
          'Submit details of the programs, projects and activities (PPA) for meetings, official invitations must be attached Receive all necessary documents, with special attention to the date of the invitation. None 5 minutes Administrative Aide I/ Municipal Administrator Review the details of the PPAs, attend meetings if any. Draft recommendations based on the report/presentation of the offices. 1 hour (or depending on the duration of the meeting, if any) Municipal Administrator ￼ Start the process of endorsing the recommendations, reviewed and signed by the Municipal Administrator, and endorse to the concerned offices. 10 minutes Municipal Administrator',
        number: '1.',
        role: 'agency',
      },
    ],
    title:
      'SUPERVISION, FACILITATION AND/OR ATTENDANCE IN MEETINGS CONCERNING THE MUNICIAPAL GOVERNMENT PROGRAMS, PROJECTS, SERVICES AND ACTIVITIES',
    transactionTypes: ['G2C', 'G2B', 'G2G'],
    whoMayApply:
      'Barangays, Educational Institution National Government Agencies, Civil Society Organization in the municipality',
  },
];

export const citizensCharter2026ProcedureCount = procedureDefinitions.length;

export function createCitizensCharter2026Records(
  source: SourceRecord,
  announcementSource: SourceRecord
): ServiceRecord[] {
  return procedureDefinitions.map(definition => {
    const office = definition.office
      .replace(/’\s+s/g, '’s')
      .replace(/\s+/g, ' ')
      .trim();
    const transactionTypes = Array.from(
      new Set([
        ...definition.transactionTypes,
        ...(definition.classification.match(/G2[CBG]/gi) ?? []),
      ])
    ).map(value => value.toUpperCase());
    const classification = definition.classification
      .split(/type of transaction:/i)[0]
      .trim();
    const category = office.toLowerCase().includes('engineer')
      ? 'Engineering and building permits'
      : definition.category;

    return {
      slug:
        'citizens-charter-2026-p' +
        String(definition.page).padStart(3, '0') +
        '-' +
        definition.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      title: definition.title,
      category,
      classification,
      description:
        definition.description ||
        'Procedure published on page ' +
          definition.page +
          " of the Lal-lo Citizen's Charter 2026.",
      whoMayApply: definition.whoMayApply,
      requirements: definition.requirements,
      processingTime: definition.processingTime,
      fees: definition.fees,
      steps: definition.steps.map(step => ({
        ...step,
        role: /^\d+\.$/.test(String(step.number)) ? 'client' : 'agency',
      })),
      responsibleOffice: office,
      transactionTypes,
      charterPages:
        definition.page === definition.endPage
          ? String(definition.page)
          : String(definition.page) + '–' + String(definition.endPage),
      recordKind: 'charter-procedure',
      includeInResourceHub: false,
      pendingFields: [
        ...(definition.requirements.length === 0 ? ['requirements'] : []),
        ...(!definition.processingTime ? ['processing time'] : []),
        ...(!definition.fees ? ['fees'] : []),
        ...(!definition.steps.length ? ['client steps'] : []),
      ],
      source,
      relatedSources: [announcementSource],
      status: 'verified',
    };
  });
}
