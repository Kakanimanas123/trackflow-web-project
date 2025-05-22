import React, { useState } from 'react';
import LeadList from '../components/leads/LeadList';
import LeadKanban from '../components/leads/LeadKanban';
import Button from '../components/ui/Button';
import { List, Columns } from 'lucide-react';

const LeadsPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'kanban'>('list');

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={view === 'list' ? 'primary' : 'outline'}
            onClick={() => setView('list')}
            leftIcon={<List size={16} />}
          >
            List View
          </Button>
          <Button
            size="sm"
            variant={view === 'kanban' ? 'primary' : 'outline'}
            onClick={() => setView('kanban')}
            leftIcon={<Columns size={16} />}
          >
            Kanban View
          </Button>
        </div>
      </div>
      {view === 'list' ? <LeadList /> : <LeadKanban />}
    </div>
  );
};

export default LeadsPage;