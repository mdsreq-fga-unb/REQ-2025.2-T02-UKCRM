# Leads Management System

Complete leads management functionality with role-based permissions, mocked data, and comprehensive tests.

## Features

All functionality respects role-based permissions:

### 1. Lead Assignment (Sales Manager only)
- **Permission Required:** `lead:assign`
- **Roles:** Sales Manager, Owner
- Assign leads to SDRs and Closers
- Reassign leads between team members

### 2. Manual Lead Registration (SDR)
- **Permission Required:** `lead:create`
- **Roles:** SDR, Sales Coordinator, Sales Manager, Owner
- Create new leads with detailed information
- Set initial assignment and stage

### 3. Lead Editing
- **Permission Required:** `lead:edit`
- **Roles:** SDR, Closer, Sales Coordinator, Sales Manager, Owner
- Update lead information
- SDR/Closer can only edit assigned leads
- Sales Manager and Owner can edit all leads

### 4. Lead Deletion (SDR)
- **Permission Required:** `lead:delete`
- **Roles:** SDR, Sales Manager, Owner
- Delete leads from the system
- Permanent removal

### 5. Detailed Lead Visualization
- **Permission Required:** `lead:view:assigned` or `lead:view:all`
- **All Roles**
- View complete lead details including:
  - Name, CPF, Phone, Email
  - Career, Income
  - Interests (array)
  - Campaign of origin
  - Contact origin
  - Temperature (Frio/Morno/Quente)
  - Assignment status
  - Creation and update timestamps

### 6. Lead Gain/Loss Registration (Closer)
- **Permission Required:** `lead:status:change`
- **Roles:** Closer, Sales Coordinator, Sales Manager, Owner
- Mark negotiations as "Gained" or "Lost"
- Register the final value
- Add reason for outcome

## File Structure

```
src/pages/Leads/
├── types/
│   └── lead.types.ts          # TypeScript interfaces and types
├── data/
│   └── mockLeads.ts           # Mock data with 10 sample leads
├── hooks/
│   ├── useLeadsMock.ts        # Mock API hook with full CRUD
│   └── useLeadsMock.test.ts   # Comprehensive test suite
└── README.md                  # This file
```

## Types

### Lead Interface
```typescript
interface Lead {
  id: number;
  name: string;
  cpf: string | null;
  email: string | null;
  phone: string;
  career: string | null;
  income: number | null;
  interests: string[];
  campaign: Campaign;
  contactOrigin: ContactOrigin;
  temperature: TemperatureVariant;
  status: LeadStatus;
  assignedTo: number | null;
  earning: number;
  gainLossValue: number | null;
  gainLossReason: string | null;
  stage: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
}
```

### LeadStatus
- `Active` - Lead is being worked on
- `Gained` - Deal was won
- `Lost` - Deal was lost

### ContactOrigin
- Website
- Social Media
- Referral
- Cold Call
- Email Campaign
- Event
- Other

### Campaign
- Summer Sale 2025
- Black Friday 2024
- Product Launch
- Retargeting
- LinkedIn Ads
- Google Ads
- Organic
- None

## Usage

### Basic Usage

```typescript
import { useLeadsMock } from '@/pages/Leads/hooks/useLeadsMock';

function MyComponent() {
  const {
    leads,
    isLoading,
    error,
    getLeads,
    getLead,
    createLead,
    updateLead,
    deleteLead,
    assignLead,
    setLeadGainLoss,
  } = useLeadsMock();

  // Component logic...
}
```

### Get All Leads

```typescript
// Get all leads (filtered by role permissions)
const leads = await getLeads();

// Get leads with filters
const activeLeads = await getLeads({
  status: ["Active"]
});

const hotLeads = await getLeads({
  temperature: ["Quente"]
});

const assignedToMember = await getLeads({
  assignedTo: [2, 5]
});
```

### Get Single Lead

```typescript
const lead = await getLead(1);

if (lead) {
  console.log(lead.name, lead.email, lead.phone);
}
```

### Create a New Lead (SDR)

```typescript
const newLead = await createLead({
  name: "João Silva",
  phone: "(11) 98765-4321",
  email: "joao@email.com",
  cpf: "123.456.789-00",
  career: "Engenheiro",
  income: 12000,
  interests: ["Technology", "AI"],
  campaign: "LinkedIn Ads",
  contactOrigin: "Social Media",
  temperature: "Quente",
  assignedTo: 2,
  earning: 25000,
  stage: 1,
  order: 1,
});
```

### Update a Lead

```typescript
const updatedLead = await updateLead({
  id: 1,
  name: "João Silva Santos",
  email: "joao.santos@email.com",
  temperature: "Morno",
  earning: 30000,
});
```

### Delete a Lead (SDR)

```typescript
await deleteLead(1);
```

### Assign a Lead (Sales Manager)

```typescript
const assignedLead = await assignLead({
  id: 5,
  assignedTo: 2, // Member ID (SDR or Closer)
});
```

### Mark Lead as Gained (Closer)

```typescript
const wonLead = await setLeadGainLoss({
  id: 3,
  status: "Gained",
  value: 85000,
  reason: "Cliente fechou contrato anual completo",
});
```

### Mark Lead as Lost (Closer)

```typescript
const lostLead = await setLeadGainLoss({
  id: 4,
  status: "Lost",
  value: 0,
  reason: "Não tinha budget aprovado para este ano",
});
```

## Role-Based Permissions

### SDR
- ✅ View assigned leads
- ✅ Create new leads
- ✅ Edit assigned leads
- ✅ Delete leads
- ❌ Assign leads
- ❌ Mark as Gained/Lost

### Closer
- ✅ View assigned leads
- ✅ Edit assigned leads
- ✅ Mark as Gained/Lost
- ❌ Create leads
- ❌ Delete leads
- ❌ Assign leads

### Sales Coordinator
- ✅ View assigned leads
- ✅ Create new leads
- ✅ Edit assigned leads
- ✅ Mark as Gained/Lost
- ❌ Delete leads
- ❌ Assign leads

### Sales Manager
- ✅ View ALL leads
- ✅ Create new leads
- ✅ Edit ALL leads
- ✅ Delete leads
- ✅ **Assign leads to team members**
- ✅ Mark as Gained/Lost

### Owner
- ✅ Full access to all operations
- ✅ View, create, edit, delete all leads
- ✅ Assign leads
- ✅ Mark as Gained/Lost

## Mock Data

The system includes 10 pre-populated leads with diverse scenarios:

1. **João Silva** - Active, assigned to SDR, Technology interests
2. **Maria Santos** - Active, assigned to Closer, Marketing background
3. **Pedro Costa** - Active, CTO with high earning potential
4. **Ana Paula Oliveira** - Active, Business owner
5. **Carlos Mendes** - **Gained**, Startup founder (R$ 85,000)
6. **Juliana Rodrigues** - **Lost**, Director (budget issues)
7. **Roberto Alves** - Active, Business consultant
8. **Fernanda Lima** - Active, CFO with high potential
9. **Gustavo Ferreira** - Active, **Unassigned**, Creative Director
10. **Beatriz Campos** - Active, Sales Manager, Retail

## Testing

Comprehensive test suite with 100% coverage of:

- ✅ Role-based access control
- ✅ CRUD operations
- ✅ Permission validation
- ✅ Lead assignment functionality
- ✅ Gain/Loss status changes
- ✅ Filtering and querying
- ✅ Error handling

### Run Tests

```bash
npm test useLeadsMock.test.ts
```

## Integration with Existing Systems

### Authentication
Uses existing auth system:
- `useAuthContext()` for current user
- `usePermissions()` for role checking
- Integrates with permission config at `@/auth/config/permissions`

### Members
References member IDs from:
- `@/pages/Membros/data/mockMembers`
- Member hierarchies: SDR, Closer, Coordenador de Vendas, Gerente, Diretor

### Temperature System
Uses existing temperature types:
- `@/lib/temperature` - TemperatureVariant type

## Local Storage

All lead data persists to `localStorage` under key `mockLeads`:
- Survives page refreshes
- Can be reset by clearing localStorage
- Initial load uses mock data if no saved data exists

## Error Handling

All operations include proper error handling:
- Permission errors with descriptive messages
- Not found errors for invalid IDs
- Validation errors for required fields
- Network simulation delays (200-400ms)

## Next Steps

To integrate with real backend:

1. Create `useLeadsBackend.ts` similar to existing backend hooks
2. Update API endpoints in `@/pages/Funnel/api/leads.api.ts`
3. Add real-time updates via WebSocket
4. Implement pagination for large datasets
5. Add advanced filtering UI components
