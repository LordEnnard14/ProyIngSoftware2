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
    description: 'Antibiótico de amplio espectro utilizado para tratar diversas infecciones bacterianas, como infecciones respiratorias, del oído y del tracto urinario.' 
  },
  { 
    id: '2',
    image: aspirina, 
    name: 'Aspirina 100 mg', 
    description: 'Medicamento antiinflamatorio no esteroideo (AINE) usado para aliviar el dolor, reducir la inflamación y bajar la fiebre. También se usa en dosis bajas para prevenir ataques cardíacos y accidentes cerebrovasculares.' 
  },
  { 
    id: '3',
    image: azitromicina, 
    name: 'Azitromicina 500 mg', 
    description: 'Antibiótico macrólido utilizado para tratar infecciones bacterianas en el tracto respiratorio, piel y tejidos blandos, así como algunas infecciones de transmisión sexual.' 
  },
  { 
    id: '4',
    image: cetirizina, 
    name: 'Cetirizina 10 mg', 
    description: 'Antihistamínico usado para aliviar los síntomas de alergias estacionales y perennes, como estornudos, secreción nasal, picazón y ojos llorosos.' 
  },
  { 
    id: '5',
    image: clonazepam, 
    name: 'Clonazepam 0.5 mg', 
    description: 'Medicamento ansiolítico y anticonvulsivo de la clase de las benzodiazepinas, utilizado para tratar trastornos de ansiedad y ciertos tipos de convulsiones.' 
  },
  { 
    id: '6',
    image: diazepam, 
    name: 'Diazepam 5 mg', 
    description: 'Benzodiazepina usada para tratar la ansiedad, los espasmos musculares y como sedante antes de procedimientos médicos. También se usa para tratar el síndrome de abstinencia alcohólica.' 
  },
  { 
    id: '7',
    image: diclofenaco, 
    name: 'Diclofenaco 50 mg', 
    description: 'AINE utilizado para reducir el dolor, la inflamación y la fiebre en condiciones como artritis, dolor muscular y dolor postoperatorio.' 
  },
  { 
    id: '8',
    image: enalapril, 
    name: 'Enalapril 10 mg', 
    description: 'Inhibidor de la enzima convertidora de angiotensina (ECA) usado para tratar la hipertensión arterial y la insuficiencia cardíaca.' 
  },
  { 
    id: '9',
    image: furosemida, 
    name: 'Furosemida 40 mg', 
    description: 'Diurético de asa utilizado para tratar la retención de líquidos y la hipertensión, al promover la eliminación de sodio y agua del cuerpo.' 
  },
  { 
    id: '10',
    image: gluconatoCalcio, 
    name: 'Gluconato de calcio 500 mg', 
    description: 'Suplemento de calcio utilizado para prevenir o tratar la deficiencia de calcio en el cuerpo, esencial para la salud ósea y dental.' 
  },
  { 
    id: '11',
    image: ibuprofeno, 
    name: 'Ibuprofeno 400 mg', 
    description: 'AINE usado para aliviar el dolor, reducir la inflamación y bajar la fiebre. Se usa comúnmente para dolor de cabeza, dolor muscular y dolor menstrual.' 
  },
  { 
    id: '12',
    image: insulina, 
    name: 'Insulina glargina', 
    description: 'Insulina de acción prolongada utilizada para el tratamiento de la diabetes tipo 1 y tipo 2, ayudando a controlar los niveles de glucosa en sangre.' 
  },
  { 
    id: '13',
    image: loratadina, 
    name: 'Loratadina 10 mg', 
    description: 'Antihistamínico no sedante utilizado para aliviar los síntomas de la rinitis alérgica y urticaria.' 
  },
  { 
    id: '14',
    image: losartan, 
    name: 'Losartán 50 mg', 
    description: 'Antagonista de los receptores de angiotensina II usado para tratar la hipertensión arterial y reducir el riesgo de accidente cerebrovascular en pacientes con hipertensión.' 
  },
  { 
    id: '15',
    image: metformina, 
    name: 'Metformina 850 mg', 
    description: 'Medicamento utilizado para controlar los niveles de azúcar en sangre en pacientes con diabetes tipo 2, mejorando la sensibilidad a la insulina.' 
  },
  { 
    id: '16',
    image: omeprazol, 
    name: 'Omeprazol 20 mg', 
    description: 'Inhibidor de la bomba de protones usado para tratar el reflujo gastroesofágico, úlceras gástricas y esofagitis por reflujo.' 
  },
  { 
    id: '17',
    image: paracetamol, 
    name: 'Paracetamol 500 mg', 
    description: 'Medicamento utilizado para aliviar el dolor y reducir la fiebre. Es comúnmente usado para dolores de cabeza, dolores musculares y fiebre.' 
  },
  { 
    id: '18',
    image: prednisona, 
    name: 'Prednisona 5 mg', 
    description: 'Corticosteroide utilizado para reducir la inflamación y tratar una variedad de condiciones médicas, como enfermedades autoinmunes, alergias y ciertos tipos de cáncer.' 
  },
  { 
    id: '19',
    image: ranitidina, 
    name: 'Ranitidina 150 mg', 
    description: 'Antagonista de los receptores H2 de histamina utilizado para tratar úlceras gástricas, reflujo gastroesofágico y otros trastornos relacionados con la producción de ácido en el estómago.' 
  },
  { 
    id: '20',
    image: salbutamol, 
    name: 'Salbutamol 100 mcg', 
    description: 'Broncodilatador utilizado para aliviar los síntomas del asma y otras enfermedades pulmonares obstructivas, como la EPOC.' 
  },
  { 
    id: '21',
    image: simvastatina, 
    name: 'Simvastatina 20 mg', 
    description: 'Estatina utilizada para reducir los niveles de colesterol LDL en sangre, ayudando a prevenir enfermedades cardiovasculares.' 
  },
];

export default productos;
