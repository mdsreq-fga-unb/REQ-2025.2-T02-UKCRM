/**
 * Example component demonstrating how to use the Leads functionality
 * This is a reference implementation showing all available operations
 */

import { useState, useEffect, useCallback } from "react";

import { useLeadsMock } from "../hooks/useLeadsMock";

import { usePermissions } from "@/auth/hooks/usePermissions";

import type { Lead, LeadCreatePayload } from "../types/lead.types";

export function LeadsExample() {
  const {
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

  const { hasPermission } = usePermissions();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [activeLeads, setActiveLeads] = useState<Lead[]>([]);

  const loadActiveLeads = useCallback(async () => {
    try {
      const leads = await getLeads({ status: ["Active"] });

      setActiveLeads(leads);
    } catch (err) {
      console.error("Failed to load leads:", err);
    }
  }, [getLeads]);

  // Load active leads on mount

  useEffect(() => {
    loadActiveLeads();
  }, [loadActiveLeads]);

  // Example 1: View a specific lead
  const handleViewLead = async (leadId: number) => {
    try {
      const lead = await getLead(leadId);
      setSelectedLead(lead);
    } catch (err) {
      console.error("Failed to get lead:", err);
    }
  };

  // Example 2: Create a new lead (SDR)
  const handleCreateLead = async () => {
    if (!hasPermission("lead:create")) {
      alert("You don't have permission to create leads");
      return;
    }

    try {
      const newLeadData: LeadCreatePayload = {
        name: "Novo Lead Exemplo",
        phone: "(11) 99999-9999",
        email: "exemplo@email.com",
        cpf: "123.456.789-00",
        career: "Empresário",
        income: 15000,
        interests: ["Business Growth", "CRM"],
        campaign: "LinkedIn Ads",
        contactOrigin: "Social Media",
        temperature: "Morno",
        assignedTo: undefined,
        earning: 20000,
        stage: 1,
        order: 1,
      };

      const newLead = await createLead(newLeadData);
      console.log("Lead created:", newLead);

      // Reload leads list
      await loadActiveLeads();
    } catch (err) {
      console.error("Failed to create lead:", err);
    }
  };

  // Example 3: Update a lead
  const handleUpdateLead = async (leadId: number) => {
    if (!hasPermission("lead:edit")) {
      alert("You don't have permission to edit leads");
      return;
    }

    try {
      const updated = await updateLead({
        id: leadId,
        name: "Nome Atualizado",
        temperature: "Quente",
        earning: 35000,
      });
      console.log("Lead updated:", updated);

      // Reload leads list
      await loadActiveLeads();
    } catch (err) {
      console.error("Failed to update lead:", err);
    }
  };

  // Example 4: Delete a lead (SDR)
  const handleDeleteLead = async (leadId: number) => {
    if (!hasPermission("lead:delete")) {
      alert("You don't have permission to delete leads");
      return;
    }

    if (!confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    try {
      await deleteLead(leadId);
      console.log("Lead deleted");

      // Reload leads list
      await loadActiveLeads();
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Example 5: Assign a lead to a team member (Sales Manager)
  const handleAssignLead = async (leadId: number, memberId: number) => {
    if (!hasPermission("lead:assign")) {
      alert(
        "You don't have permission to assign leads (requires Sales Manager or Owner)",
      );
      return;
    }

    try {
      const assigned = await assignLead({ id: leadId, assignedTo: memberId });
      console.log("Lead assigned:", assigned);

      // Reload leads list
      await loadActiveLeads();
    } catch (err) {
      console.error("Failed to assign lead:", err);
    }
  };

  // Example 6: Mark a lead as Gained (Closer)
  const handleMarkAsGained = async (leadId: number) => {
    if (!hasPermission("lead:status:change")) {
      alert(
        "You don't have permission to change lead status (requires Closer or higher)",
      );
      return;
    }

    try {
      const won = await setLeadGainLoss({
        id: leadId,
        status: "Gained",
        value: 50000,
        reason: "Cliente fechou contrato anual",
      });
      console.log("Lead marked as Gained:", won);

      // Reload leads list
      await loadActiveLeads();
    } catch (err) {
      console.error("Failed to mark lead as gained:", err);
    }
  };

  // Example 7: Mark a lead as Lost (Closer)
  const handleMarkAsLost = async (leadId: number) => {
    if (!hasPermission("lead:status:change")) {
      alert(
        "You don't have permission to change lead status (requires Closer or higher)",
      );
      return;
    }

    try {
      const lost = await setLeadGainLoss({
        id: leadId,
        status: "Lost",
        value: 0,
        reason: "Não tinha budget aprovado",
      });
      console.log("Lead marked as Lost:", lost);

      // Reload leads list
      await loadActiveLeads();
    } catch (err) {
      console.error("Failed to mark lead as lost:", err);
    }
  };

  if (isLoading) {
    return <div>Loading leads...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="leads-example">
      <h1>Leads Management Example</h1>

      {/* Action Buttons */}
      <div className="actions">
        <button onClick={handleCreateLead}>Create New Lead (SDR)</button>
      </div>

      {/* Leads List */}
      <div className="leads-list">
        <h2>Active Leads ({activeLeads.length})</h2>
        {activeLeads.map((lead) => (
          <div key={lead.id} className="lead-card">
            <h3>{lead.name}</h3>
            <p>Phone: {lead.phone}</p>
            <p>Email: {lead.email || "N/A"}</p>
            <p>Temperature: {lead.temperature}</p>
            <p>Earning: R$ {lead.earning.toLocaleString("pt-BR")}</p>
            <p>Status: {lead.status}</p>

            <div className="lead-actions">
              <button onClick={() => handleViewLead(lead.id)}>
                View Details
              </button>

              {hasPermission("lead:edit") && (
                <button onClick={() => handleUpdateLead(lead.id)}>Edit</button>
              )}

              {hasPermission("lead:delete") && (
                <button onClick={() => handleDeleteLead(lead.id)}>
                  Delete
                </button>
              )}

              {hasPermission("lead:assign") && (
                <button onClick={() => handleAssignLead(lead.id, 2)}>
                  Assign to Member #2
                </button>
              )}

              {hasPermission("lead:status:change") && (
                <>
                  <button onClick={() => handleMarkAsGained(lead.id)}>
                    Mark as Gained
                  </button>
                  <button onClick={() => handleMarkAsLost(lead.id)}>
                    Mark as Lost
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Lead Details */}
      {selectedLead && (
        <div className="lead-details">
          <h2>Lead Details</h2>
          <div className="details-grid">
            <div>
              <strong>ID:</strong> {selectedLead.id}
            </div>
            <div>
              <strong>Name:</strong> {selectedLead.name}
            </div>
            <div>
              <strong>CPF:</strong> {selectedLead.cpf || "N/A"}
            </div>
            <div>
              <strong>Email:</strong> {selectedLead.email || "N/A"}
            </div>
            <div>
              <strong>Phone:</strong> {selectedLead.phone}
            </div>
            <div>
              <strong>Career:</strong> {selectedLead.career || "N/A"}
            </div>
            <div>
              <strong>Income:</strong> R${" "}
              {selectedLead.income?.toLocaleString("pt-BR") || "N/A"}
            </div>
            <div>
              <strong>Interests:</strong> {selectedLead.interests.join(", ")}
            </div>
            <div>
              <strong>Campaign:</strong> {selectedLead.campaign}
            </div>
            <div>
              <strong>Contact Origin:</strong> {selectedLead.contactOrigin}
            </div>
            <div>
              <strong>Temperature:</strong> {selectedLead.temperature}
            </div>
            <div>
              <strong>Status:</strong> {selectedLead.status}
            </div>
            <div>
              <strong>Assigned To:</strong>{" "}
              {selectedLead.assignedTo || "Unassigned"}
            </div>
            <div>
              <strong>Earning:</strong> R${" "}
              {selectedLead.earning.toLocaleString("pt-BR")}
            </div>
            {selectedLead.gainLossValue !== null && (
              <>
                <div>
                  <strong>Gain/Loss Value:</strong> R${" "}
                  {selectedLead.gainLossValue.toLocaleString("pt-BR")}
                </div>
                <div>
                  <strong>Reason:</strong> {selectedLead.gainLossReason}
                </div>
              </>
            )}
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(selectedLead.createdAt).toLocaleString("pt-BR")}
            </div>
            <div>
              <strong>Updated At:</strong>{" "}
              {new Date(selectedLead.updatedAt).toLocaleString("pt-BR")}
            </div>
            <div>
              <strong>Created By:</strong> Member #{selectedLead.createdBy}
            </div>
          </div>

          <button onClick={() => setSelectedLead(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
}
