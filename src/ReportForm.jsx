
import { useState } from 'react'
import {
  X, Upload, MapPin, CalendarDays,
  Package, FileText, User, Mail, Phone
} from 'lucide-react'

const categories = [
  'Electronics',
  'Personal Belongings',
  'Academic Items',
  'University Property',
  'Other Items',
]

function ReportForm({ type, onClose }) {
  const isLost = type === 'Lost'

  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    location: '',
    date: '',
    studentName: '',
    email: '',
    phone: '',
  })

  const [photo, setPhoto] = useState(null)
const [photoPreview, setPhotoPreview] = useState(null)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  
const handleSubmit = async (e) => {
  e.preventDefault()

  let photoData = null

  if (photo) {
    photoData = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(photo)
    })
  }

  const newReport = {
    id: Date.now(),
    ...formData,
    type,
    photo: photoData,
    createdAt: new Date().toISOString(),
  }

  const existingReports = JSON.parse(
    localStorage.getItem('finditReports') || '[]'
  )

  existingReports.unshift(newReport)

  localStorage.setItem(
    'finditReports',
    JSON.stringify(existingReports)
  )

  window.dispatchEvent(new Event('reportsUpdated'))

  alert(`${type} item reported successfully!`)

  onClose()
}


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className={`flex items-center justify-between p-6 text-white ${
          isLost ? 'bg-blue-700' : 'bg-emerald-600'
        }`}>
          <div>
            <h2 className="text-2xl font-extrabold">
              Report {type} Item
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Help reconnect belongings across Bennett University.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/20"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">

          {/* ITEM INFORMATION */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Package className="text-blue-600" />
              Item Information
            </h3>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Item Name *
                </label>
                <input
                  required
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="e.g. Samsung wireless earbuds"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category *
                </label>
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description *
                </label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the item, its colour, brand and identifying features..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </div>

          {/* LOCATION AND DATE */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <MapPin className="text-blue-600" />
              Location & Date
            </h3>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {isLost ? 'Where did you lose it?' : 'Where did you find it?'} *
                </label>
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Central Library, Academic Block"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays size={17} />
                  {isLost ? 'Date Lost' : 'Date Found'} *
                </label>
                <input
                  required
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </div>

          {/* PHOTO UPLOAD */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Upload className="text-blue-600" />
              Upload Item Photograph
            </h3>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center hover:border-blue-500">
              <Upload size={30} className="mb-2 text-blue-600" />
              <span className="font-semibold text-slate-700">
                {photo ? photo.name : 'Click to upload a photograph'}
              </span>
              <span className="mt-1 text-xs text-slate-500">
                JPG, PNG or WEBP · Maximum 5 MB
              </span>
              <input
              id="item-photo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return

                  if (file.size > 5 * 1024 * 1024) {
                    alert('Please select an image smaller than 5 MB.')
                    e.target.value = ''
                    return
                  }

                  setPhoto(file)
                  setPhotoPreview(URL.createObjectURL(file))
                }}
              />
            </label>
           {photoPreview && (
  <div className="mt-4">
    <p className="text-sm font-semibold mb-2">
      Image Preview
    </p>

    <img
      src={photoPreview}
      alt="Selected item"
      className="h-40 w-full max-w-xs rounded-xl object-cover border border-slate-200"
    />

    <button
      type="button"
     onClick={() => {
  setPhoto(null)
  setPhotoPreview(null)
  document.getElementById('item-photo').value = ''
}}
      className="mt-3 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
    >
      Remove Image
    </button>
  </div>
)}
          </div>

          {/* STUDENT INFORMATION */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <User className="text-blue-600" />
              Your Contact Information
            </h3>

            <div className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name *
                </label>
                <input
                  required
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Mail size={16} /> University Email *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@bennett.edu.in"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Phone size={16} /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your contact number (optional)"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex-1 rounded-xl px-5 py-3 font-bold text-white shadow-md ${
                isLost
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              Submit {type} Report
            </button>
          </div>

          <p className="text-center text-xs text-slate-400">
            Your contact information should only be used for resolving this report.
          </p>

        </form>
      </div>
    </div>
  )
}

export default ReportForm
