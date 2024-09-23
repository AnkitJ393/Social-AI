'use client'
import { useState } from 'react';
import SearchDashboard from './_components/search-dashboard'
import TemplateList from './_components/template-list'

const Dashboard = () => {

const [searchInput,setSearchInput]=useState<string | undefined>();

  return (
    <div>
      <SearchDashboard onSearchChange={setSearchInput} />
      <TemplateList searchInput={searchInput} />
    </div>
  )
}

export default Dashboard
