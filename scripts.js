document.addEventListener("DOMContentLoaded", function() {
    // KPI Data
    document.getElementById("totalAccounts").innerText = 35;
    document.getElementById("approvedAccounts").innerText = 6;
    document.getElementById("pendingAccounts").innerText = 23;
    document.getElementById("closedAccounts").innerText = 0;

    // Chart Data
    const requestStatusData = {
        labels: ["Under Review", "Closed", "Approved"],
        datasets: [{
            label: "Request Status Distribution",
            data: [8, 5, 4],
            backgroundColor: ["#3498db", "#e74c3c", "#2ecc71"]
        }]
    };

    const fmlaApprovalData = {
        labels: ["Pending", "Approved", "Qualified", "Under Review", "Baby Bonding"],
        datasets: [{
            label: "FMLA Approval Status",
            data: [26, 6, 2, 1, 1],
            backgroundColor: ["#f39c12", "#3498db", "#9b59b6", "#e74c3c", "#2ecc71"]
        }]
    };

    const approvalByLocationData = {
        labels: ["WPA"],
        datasets: [
            { label: "Approved", data: [6], backgroundColor: "#3498db" },
            { label: "Pending", data: [25], backgroundColor: "#f39c12" },
            { label: "Qualified", data: [2], backgroundColor: "#9b59b6" },
            { label: "Under Review", data: [1], backgroundColor: "#e74c3c" }
        ]
    };

    // Render Charts
    const ctx1 = document.getElementById("requestStatusChart").getContext("2d");
    new Chart(ctx1, { type: "bar", data: requestStatusData });

    const ctx2 = document.getElementById("fmlaApprovalChart").getContext("2d");
    new Chart(ctx2, { type: "bar", data: fmlaApprovalData });

    const ctx3 = document.getElementById("approvalByLocationChart").getContext("2d");
    new Chart(ctx3, { type: "bar", data: approvalByLocationData, options: { scales: { x: { stacked: true }, y: { stacked: true } } } });

    // Employee Lookup by UKG Number
    const employeeData = window.employeeData || {};

    function lookupEmployee() {
        const ukgNumber = document.getElementById("ukgNumberInput").value;
        const employeeInfo = employeeData[ukgNumber];

        if (employeeInfo) {
            document.getElementById("employeeInfo").innerHTML = `
                <p><strong>Name:</strong> ${employeeInfo.name}</p>
                <p><strong>Location:</strong> ${employeeInfo.location}</p>
                <p><strong>Employment Status:</strong> ${employeeInfo.status}</p>
                <p><strong>Request Status:</strong> ${employeeInfo.requestStatus}</p>
                <p><strong>FMLA Approval Status:</strong> ${employeeInfo.fmlaStatus}</p>
            `;
        } else {
            document.getElementById("employeeInfo").innerHTML = "<p>Employee not found.</p>";
        }
    }

    // Expose function globally for button click
    window.lookupEmployee = lookupEmployee;
});
