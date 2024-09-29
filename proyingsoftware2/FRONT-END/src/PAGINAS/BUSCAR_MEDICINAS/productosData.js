// Importa las imágenes
import amoxicilina from '../../imagenes/Amoxicilina 500 mg.jpg';
import aspirina from '../../imagenes/Aspirina 100 mg.jpeg';
import azitromicina from '../../imagenes/Azitromicina 500 mg.jpg';
import cetirizina from '../../imagenes/Cetirizina 10 mg.jpg';
import clonazepam from '../../imagenes/Clonazepam 0.5 mg.jpeg';
import diazepam from '../../imagenes/Diazepam 5 mg.jpg';
import diclofenaco from '../../imagenes/Diclofenaco 50 mg.jpg';
import enalapril from '../../imagenes/Enalapril 10 mg.jpeg';
import furosemida from '../../imagenes/Furosemida 40 mg.jpeg';
import gluconatoCalcio from '../../imagenes/Gluconato de calcio 500 mg.jpeg';
import ibuprofeno from '../../imagenes/ibuprofeno 400mg.jpg';
import insulina from '../../imagenes/Insulina glargina.jpg';
import loratadina from '../../imagenes/Loratadina 10 mg.jpeg';
import losartan from '../../imagenes/Losartán 50 mg.jpg';
import metformina from '../../imagenes/Metformina 850 mg.jpg';
import omeprazol from '../../imagenes/omeprazol-20.jpg';
import paracetamol from '../../imagenes/paracetamol 500mg.png';
import prednisona from '../../imagenes/Prednisona 5 mg.jpeg';
import ranitidina from '../../imagenes/Ranitidina 150 mg.jpeg';
import salbutamol from '../../imagenes/Salbutamol 100 mcg.jpg';
import simvastatina from '../../imagenes/Simvastatina 20 mg.jpeg';

const productos = [
  { 
    id: '1',
    image: amoxicilina, 
    name: 'Amoxicilina 500 mg', 
    description: 'Antibiótico de amplio espectro utilizado para tratar infecciones.',
    caracteristicas: ['Antibiótico', '500 mg', 'Cápsulas'],
    precio: 12.50
  },
  { 
    id: '2',
    image: aspirina, 
    name: 'Aspirina 100 mg', 
    description: 'AINE usado para aliviar el dolor y prevenir accidentes cerebrovasculares.',
    caracteristicas: ['Anti-inflamatorio', '100 mg', 'Tabletas'],
    precio: 4.00
  },
  { 
    id: '3',
    image: azitromicina, 
    name: 'Azitromicina 500 mg', 
    description: 'Antibiótico utilizado para tratar infecciones bacterianas.',
    caracteristicas: ['Antibiótico', '500 mg', 'Tabletas'],
    precio: 25.00
  },
  { 
    id: '4',
    image: cetirizina, 
    name: 'Cetirizina 10 mg', 
    description: 'Antihistamínico para aliviar síntomas de alergias.',
    caracteristicas: ['Antihistamínico', '10 mg', 'Tabletas'],
    precio: 8.00
  },
  { 
    id: '5',
    image: clonazepam, 
    name: 'Clonazepam 0.5 mg', 
    description: 'Ansiolítico y anticonvulsivo para tratar la ansiedad y convulsiones.',
    caracteristicas: ['Ansiolítico', '0.5 mg', 'Tabletas'],
    precio: 15.00
  },
  { 
    id: '6',
    image: diazepam, 
    name: 'Diazepam 5 mg', 
    description: 'Benzodiazepina usada para tratar la ansiedad y espasmos musculares.',
    caracteristicas: ['Ansiolítico', '5 mg', 'Tabletas'],
    precio: 10.00
  },
  { 
    id: '7',
    image: diclofenaco, 
    name: 'Diclofenaco 50 mg', 
    description: 'AINE para reducir el dolor y la inflamación.',
    caracteristicas: ['Anti-inflamatorio', '50 mg', 'Tabletas'],
    precio: 7.00
  },
  { 
    id: '8',
    image: enalapril, 
    name: 'Enalapril 10 mg', 
    description: 'Inhibidor de ECA para tratar la hipertensión.',
    caracteristicas: ['Antihipertensivo', '10 mg', 'Tabletas'],
    precio: 6.50
  },
  { 
    id: '9',
    image: furosemida, 
    name: 'Furosemida 40 mg', 
    description: 'Diurético usado para tratar la retención de líquidos.',
    caracteristicas: ['Diurético', '40 mg', 'Tabletas'],
    precio: 5.00
  },
  { 
    id: '10',
    image: gluconatoCalcio, 
    name: 'Gluconato de calcio 500 mg', 
    description: 'Suplemento de calcio para la salud ósea y dental.',
    caracteristicas: ['Suplemento', '500 mg', 'Tabletas'],
    precio: 12.00
  },
  { 
    id: '11',
    image: ibuprofeno, 
    name: 'Ibuprofeno 400 mg', 
    description: 'AINE para el dolor y la inflamación.',
    caracteristicas: ['Anti-inflamatorio', '400 mg', 'Tabletas'],
    precio: 5.50
  },
  { 
    id: '12',
    image: insulina, 
    name: 'Insulina glargina', 
    description: 'Insulina de acción prolongada para tratar la diabetes.',
    caracteristicas: ['Insulina', 'Inyección', 'Acción prolongada'],
    precio: 90.00
  },
  { 
    id: '13',
    image: loratadina, 
    name: 'Loratadina 10 mg', 
    description: 'Antihistamínico no sedante para rinitis alérgica y urticaria.',
    caracteristicas: ['Antihistamínico', '10 mg', 'Tabletas'],
    precio: 6.00
  },
  { 
    id: '14',
    image: losartan, 
    name: 'Losartán 50 mg', 
    description: 'Antagonista de angiotensina para la hipertensión.',
    caracteristicas: ['Antihipertensivo', '50 mg', 'Tabletas'],
    precio: 14.00
  },
  { 
    id: '15',
    image: metformina, 
    name: 'Metformina 850 mg', 
    description: 'Medicamento para controlar el azúcar en pacientes con diabetes.',
    caracteristicas: ['Antidiabético', '850 mg', 'Tabletas'],
    precio: 18.00
  },
  { 
    id: '16',
    image: omeprazol, 
    name: 'Omeprazol 20 mg', 
    description: 'Inhibidor de la bomba de protones para tratar el reflujo.',
    caracteristicas: ['Antiácido', '20 mg', 'Tabletas'],
    precio: 10.00
  },
  { 
    id: '17',
    image: paracetamol, 
    name: 'Paracetamol 500 mg', 
    description: 'Medicamento para aliviar el dolor y reducir la fiebre.',
    caracteristicas: ['Analgésico', '500 mg', 'Tabletas'],
    precio: 4.50
  },
  { 
    id: '18',
    image: prednisona, 
    name: 'Prednisona 5 mg', 
    description: 'Corticosteroide para reducir la inflamación.',
    caracteristicas: ['Anti-inflamatorio', '5 mg', 'Tabletas'],
    precio: 6.00
  },
  { 
    id: '19',
    image: ranitidina, 
    name: 'Ranitidina 150 mg', 
    description: 'Antagonista de histamina para tratar el reflujo y úlceras.',
    caracteristicas: ['Antiácido', '150 mg', 'Tabletas'],
    precio: 8.00
  },
  { 
    id: '20',
    image: salbutamol, 
    name: 'Salbutamol 100 mcg', 
    description: 'Broncodilatador para el asma y otras enfermedades pulmonares.',
    caracteristicas: ['Broncodilatador', '100 mcg', 'Inhalador'],
    precio: 18.50
  },
  { 
    id: '21',
    image: simvastatina, 
    name: 'Simvastatina 20 mg', 
    description: 'Estatina para reducir el colesterol LDL.',
    caracteristicas: ['Reductor de colesterol', '20 mg', 'Tabletas'],
    precio: 15.00
  }
];


export default productos;
