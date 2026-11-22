import ReportForm from './ReportForm'
import { useState, useEffect } from 'react'
import {
  Search, MapPin, Clock, PlusCircle, Package,
  Smartphone, Wallet, BookOpen, CreditCard,
  MoreHorizontal, ArrowRight, ShieldCheck,
  Bell, Menu, X, Heart
} from 'lucide-react'

const categories = [
  { name: 'Electronics', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { name: 'Personal Belongings', icon: Wallet, color: 'bg-purple-100 text-purple-600' },
  { name: 'Academic Items', icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
  { name: 'University Property', icon: CreditCard, color: 'bg-green-100 text-green-600' },
  { name: 'Other Items', icon: MoreHorizontal, color: 'bg-pink-100 text-pink-600' },
]

const getSavedReports = () => {
  try {
    return JSON.parse(localStorage.getItem('finditReports')) || []
  } catch {
    return []
  }
}



function App() {
  const [zoomedImage, setZoomedImage] = useState(null)
  const [items, setItems] = useState(getSavedReports())
  useEffect(() => {
  const updateReports = () => {
    setItems(getSavedReports())
  }

  window.addEventListener('reportsUpdated', updateReports)

  return () => {
    window.removeEventListener('reportsUpdated', updateReports)
  }
}, [])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [reportType, setReportType] = useState(null)
 
const filteredItems = items.filter(item => {
  const searchText = search.toLowerCase().trim()

  const searchableText = [
    item.itemName,
    item.name,
    item.category,
    item.location,
    item.description,
    item.type
  ].filter(Boolean).join(' ').toLowerCase()

  const matchesSearch = searchableText.includes(searchText)

  const matchesCategory =
    selectedCategory === 'All' ||
    item.category === selectedCategory

  const matchesStatus =
  statusFilter === 'All' ||
  item.type === statusFilter

return matchesSearch && matchesCategory && matchesStatus
})
const sortedItems = [...filteredItems].sort((a, b) => {
  const dateA = new Date(a.createdAt || a.date).getTime()
  const dateB = new Date(b.createdAt || b.date).getTime()

  return sortOrder === 'newest'
    ? dateB - dateA
    : dateA - dateB
})

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Search size={25} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                FindIt<span className="text-blue-600">@BU</span>
              </h1>
              <p className="text-[10px] font-semibold tracking-widest text-slate-500">
                BENNETT UNIVERSITY
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="font-semibold text-blue-600">Home</a>
            <a href="#browse" className="text-sm font-medium hover:text-blue-600">Browse Items</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-blue-600">How It Works</a>
            <a href="#about" className="text-sm font-medium hover:text-blue-600">About</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Sign In
            </button>
           <button
  onClick={() => setReportType('Lost')}
  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
>
              Get Started
            </button>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="space-y-3 border-t p-5 md:hidden">
            <a href="#browse" className="block">Browse Items</a>
            <a href="#how-it-works" className="block">How It Works</a>
            <a href="#about" className="block">About</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[45px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full border-[55px] border-white/5" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
              <ShieldCheck size={16} /> Bennett University Campus
            </span>

            <h2 className="mt-7 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Lost something?
              <span className="mt-2 block text-blue-300">Let's find it.</span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-blue-100">
              Your belongings deserve a way back home. Report, discover and
              reconnect with lost items across our university campus.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              
              
<button
  onClick={() => setReportType('Lost')}
  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg hover:bg-blue-50 transition"
>
  <PlusCircle size={19} />
  Report Lost Item
</button>

<button
  onClick={() => setReportType('Found')}
  className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 font-bold text-white hover:bg-white/20 transition"
>
  <Package size={19} />
  Report Found Item
</button>

            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-blue-100">
              <span className="flex items-center gap-2"><ShieldCheck size={17} /> Campus-focused</span>
              <span className="flex items-center gap-2"><Heart size={17} /> Community-powered</span>
            </div>
          </div>

          <div className="hidden md:flex md:justify-center">
            <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
              <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white shadow-2xl">
                <Search size={110} strokeWidth={1.3} className="text-blue-600" />
              </div>
              <div className="absolute -right-2 top-10 rounded-2xl bg-white p-4 shadow-xl">
                <Smartphone className="text-blue-600" size={28} />
              </div>
              <div className="absolute -bottom-2 left-0 rounded-2xl bg-white p-4 shadow-xl">
                <Wallet className="text-purple-600" size={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative z-10 mx-auto -mt-7 max-w-4xl px-5">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:flex-row">
          <div className="flex flex-1 items-center gap-3 px-3">
            <Search className="text-slate-400" size={22} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for a lost or found item..."
              className="w-full py-3 text-sm outline-none"
            />
            {search && (
  <button
    onClick={() => setSearch('')}
    className="text-slate-400 hover:text-red-500 font-bold px-2"
    title="Clear search"
  >
    ✕
  </button>
)}
          </div>
          <button
            onClick={() => document.getElementById('browse').scrollIntoView({ behavior: 'smooth' })}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Search Items
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Explore Categories</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Find what you're looking for</h2>
          <p className="mt-2 text-slate-500">Browse belongings by category.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map(category => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name)
                  document.getElementById('browse').scrollIntoView({ behavior: 'smooth' })
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}>
                  <Icon size={25} />
                </div>
                <h3 className="font-bold text-slate-800">{category.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Explore <ArrowRight size={13} />
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* RECENT ITEMS */}
      <section id="browse" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Campus Updates</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Recently reported items</h2>
              <p className="mt-2 text-slate-500">Explore items reported by the campus community.</p>
            </div>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              View All Items <ArrowRight className="ml-1 inline" size={16} />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['All', ...categories.map(c => c.name)].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

{/* SORTING AND STATUS FILTERS */}
<div className="mt-6 flex flex-wrap items-center justify-between gap-4">

  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-slate-600">
      Status:
    </label>

    <select
      value={statusFilter}
      onChange={e => setStatusFilter(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
    >
      <option value="All">All Items</option>
      <option value="Lost">Lost Items</option>
      <option value="Found">Found Items</option>
    </select>
  </div>

  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-slate-600">
      Sort by:
    </label>

    <select
      value={sortOrder}
      onChange={e => setSortOrder(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
    </select>
  </div>

</div>

<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredItems.length === 0 ? (
  <div className="col-span-full text-center py-16">
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-xl font-bold text-slate-800">
      No items found
    </h3>
    <p className="text-slate-500 mt-2">
      Try another keyword or select a different category.
    </p>
  </div>
) : (
  sortedItems.map(item => (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
                 {item.photo ? (
  <img
    src={item.photo}
    alt={item.itemName || "Reported item"}
    className="absolute inset-0 w-full h-full object-cover"
    onError={(e) => {
      e.currentTarget.style.display = "none"
      e.currentTarget.nextElementSibling.style.display = "block"
    }}
  />
) : null}

<span
  className="text-7xl"
  style={{ display: item.photo ? "none" : "block" }}
>
  {item.emoji}
</span>
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                    item.type === 'Found' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-blue-600">{item.category}</p>
                  <h3 className="mt-2 text-lg font-bold">
  {item.itemName || item.name || 'Unnamed item'}
</h3>
                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <p className="flex items-center gap-2"><MapPin size={15} /> {item.location}</p>
                    <p className="flex items-center gap-2"><Clock size={15} /> {item.date}</p>
                  </div>
                  <button
  onClick={() => setSelectedItem(item)}
  className="mt-5 w-full rounded-lg border border-blue-200 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 transition"
>
  View Details <ArrowRight className="ml-1 inline" size={15} />
</button>
                </div>
              </div>
            )) )}
          </div>

          
          <p className="mt-6 text-center text-xs text-slate-400">
            Demonstration listings only. These are sample items, not actual campus reports.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Simple Process</p>
          <h2 className="mt-2 text-3xl font-extrabold">How FindIt@BU works</h2>
          <p className="mt-3 text-slate-500">Three simple steps to reconnect belongings with their owners.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { number: '01', title: 'Report an Item', text: 'Submit details about an item you lost or found on campus.', icon: PlusCircle },
            { number: '02', title: 'Search & Discover', text: 'Browse reports and look for items matching your description.', icon: Search },
            { number: '03', title: 'Reconnect', text: 'Verify ownership and arrange a safe return of the belonging.', icon: Heart },
          ].map(step => {
            const Icon = step.icon
            return (
              <div key={step.number} className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Icon size={30} />
                </div>
                <p className="mt-5 text-sm font-bold text-blue-600">{step.number}</p>
                <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-500">{step.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="bg-slate-950 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row">
          <div>
            <h2 className="text-2xl font-extrabold">FindIt<span className="text-blue-400">@BU</span></h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Connecting lost belongings with their owners through a smarter campus community.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <a href="#browse" className="block hover:text-white">Browse Items</a>
              <a href="#how-it-works" className="block hover:text-white">How It Works</a>
              <a href="#about" className="block hover:text-white">About Us</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 px-5 pt-6 text-center text-xs text-slate-500">
          © 2026 FindIt@BU · Student TREP Project · Bennett University
        </div>
      </footer>
      {reportType && (
  <ReportForm
    type={reportType}
    onClose={() => setReportType(null)}
  />
)}
{selectedItem && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Item Details
        </h2>

         <button
          onClick={() => setSelectedItem(null)}
          className="text-2xl text-slate-500 hover:text-red-500"
        >
          ×
        </button>
      </div>
{selectedItem.photo && (
  <div className="mb-5">
   
<img
  src={selectedItem.photo}
  alt={selectedItem.itemName || "Reported item"}
  onClick={() => setZoomedImage(selectedItem.photo)}
  className="w-full max-h-80 object-contain rounded-xl border border-slate-200 bg-slate-50 cursor-zoom-in hover:opacity-90 transition"
/>

  </div>
)}
      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
        selectedItem.type === 'Found'
          ? 'bg-green-100 text-green-700'
          : 'bg-orange-100 text-orange-700'
      }`}>
        {selectedItem.type}
      </span>

      <h3 className="mt-4 text-xl font-bold">
        {selectedItem.itemName || selectedItem.name}
      </h3>

      <div className="mt-4 space-y-3 text-slate-600">
        <p><strong>Category:</strong> {selectedItem.category}</p>
        <p><strong>Location:</strong> {selectedItem.location}</p>
        <p><strong>Date:</strong> {selectedItem.date}</p>
        <p><strong>Description:</strong> {selectedItem.description || 'No description provided.'}</p>
        <p><strong>Reported by:</strong> {selectedItem.studentName || 'Not provided'}</p>
        <p><strong>Email:</strong> {selectedItem.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> {selectedItem.phone || 'Not provided'}</p>
      </div>

      <button
        onClick={() => setSelectedItem(null)}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Close
      </button>

    </div>
  </div>
)}
{zoomedImage && (
  <div
    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
    onClick={() => setZoomedImage(null)}
  >
    <button
      onClick={() => setZoomedImage(null)}
      className="absolute top-5 right-6 text-white text-4xl"
    >
      &times;
    </button>

    <img
      src={zoomedImage}
      alt="Zoomed item"
      className="max-w-full max-h-[90vh] object-contain rounded-lg"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}
    </div>
  )
}

export default App
