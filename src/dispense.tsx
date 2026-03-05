import { useState } from 'react';
import { CheckCircle2, Circle, User, FileText, Pill, DollarSign, Clock, ChevronRight, LogOut, Package, AlertCircle } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  quantity: string;
  status: string;
  selected: boolean;
}

interface Prescription {
  id: number;
  patientName: string;
  status: 'In Progress' | 'New';
  timeAgo: string;
  fileNumber: string;
}

export default function App() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Pantoprazole 40 mg', dosage: 'One tablet daily 30 minutes before breakfast.', quantity: '30 Capsules', status: 'Available', selected: true },
    { id: 2, name: 'Augmentin 1 g', dosage: 'One tablet every 12 hours for 7 days.', quantity: '14 Tablets', status: 'Available', selected: true },
    { id: 3, name: 'Panadol Extra', dosage: 'As needed every 6 hours (Max 8 tablets).', quantity: '24 Tablets', status: 'Available', selected: false },
  ]);

  const [prescriptions] = useState<Prescription[]>([
    { id: 1, patientName: 'Ahmed Mohammed Abdullah', status: 'In Progress', timeAgo: '10 mins ago', fileNumber: '#445821' },
    { id: 2, patientName: 'Sarah Ali Salem', status: 'New', timeAgo: '32 mins ago', fileNumber: '#445822' },
    { id: 3, patientName: 'Mahmoud Hassan Omar', status: 'New', timeAgo: '45 mins ago', fileNumber: '#445823' },
  ]);

  const toggleMedication = (id: number) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id ? { ...med, selected: !med.selected } : med
      )
    );
  };

  const selectedCount = medications.filter(m => m.selected).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Incoming Prescriptions */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Incoming Prescriptions
          </h2>
          <p className="text-sm text-slate-500 mt-1">12 prescriptions in queue</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${
                prescription.status === 'In Progress' ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-slate-800 text-sm">{prescription.patientName}</p>
                  <p className="text-xs text-slate-500">{prescription.fileNumber}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    prescription.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {prescription.status}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {prescription.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Pharmacy Dispensing System</h1>
                <p className="text-sm text-slate-500">Prescription #445821</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Wednesday, May 24th</span>
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">F</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Dr. Fahad Al-Otaibi</p>
                  <p className="text-xs text-slate-500">Shift Pharmacist</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Patient Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Patient Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-500">Patient Name</p>
                <p className="font-semibold text-slate-800">Ahmed Mohammed Abdullah</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">File Number</p>
                <p className="font-semibold text-slate-800">#445821</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Age / Gender</p>
                <p className="font-semibold text-slate-800">34 Years / Male</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Treating Physician</p>
                <p className="font-semibold text-slate-800">Dr. Yousef Al-Ahmed</p>
                <p className="text-xs text-slate-500">Internal Medicine Consultant</p>
              </div>
            </div>
          </div>

          {/* Medications Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                  Prescribed Medications
                </h2>
                <span className="text-sm text-slate-500">3 Items</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Select
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Medication
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Dosage & Instructions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medications.map((medication) => (
                    <tr
                      key={medication.id}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                        medication.selected ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => toggleMedication(medication.id)}
                    >
                      <td className="px-6 py-4">
                        {medication.selected ? (
                          <CheckCircle2 className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{medication.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">{medication.dosage}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">{medication.quantity}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          {medication.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>
                  <strong className="text-slate-800">{selectedCount}</strong> of {medications.length} medications selected for dispensing
                </span>
              </p>
            </div>
          </div>

          {/* Financial Summary & Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Financial Summary
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-slate-500">Expected Total Invoice:</span>
                  <span className="text-3xl font-bold text-blue-600">285.50 SAR</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Including VAT</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Issue Invoice
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
                  <Package className="w-5 h-5" />
                  Dispense Prescription ({selectedCount})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <span>Logged in as: <strong className="text-slate-700">Dr. Fahad Al-Otaibi</strong> (Shift Pharmacist)</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Date: <strong className="text-slate-700">Wednesday, May 24th</strong></span>
              <button className="flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
