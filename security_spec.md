# Security Specification: Digital Marketing Agency OS

## Data Invariants
1. A TeamMember document MUST match the authenticated user's ID for self-updates (non-role fields).
2. Only Admins can modify the `role` field in TeamMember documents.
3. Every Client must have a valid `contactEmail`.
4. Email dispatches are read-only after creation (audit trail discipline).
5. Only Admins can delete Clients or Team Members.

## The "Dirty Dozen" Payloads (Red Team Test Cases)
1. **Self-Promotion Attack**: Non-admin user attempts to update their own role from `Strategist` to `Admin`.
2. **PII Data Leak**: Authenticated user attempts to list all client emails without being an Admin or the assigned Account Manager.
3. **Identity Spoofing**: User A attempts to create a TeamMember document with their ID but User B's email.
4. **Shadow Client Creation**: Unauthenticated user attempts to create a Client record.
5. **Audit Trail Tampering**: User attempts to update a finished `EmailDispatchLog` to hide a 'failed' status.
6. **Resource Exhaustion**: Attacker attempts to create a document with a 1MB string in the `name` field.
7. **Cross-Tenant Breach**: User from Tenant A attempts to access `/clients/` of Tenant B (if multi-tenancy was active, here we use UID-based controls).
8. **Invalid Status Injection**: User attempts to set `Client.status` to 'VIP' (not in enum).
9. **Orphaned Dispatch**: User attempts to create a Dispatch log with a non-existent `clientId` (if relational).
10. **ID Poisoning**: User attempts to create a document with a 1.5KB junk-character ID.
11. **Email Spoofing (Auth)**: User with unverified email attempts to access high-security 'Admin' operations.
12. **Bulk Scrape**: Authenticated user attempts to fetch 500 client documents in one query without filters (Security rules must enforce query constraints).

## The Test Runner (firestore.rules.test.ts)
```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

// Test logic would be implemented here to verify the above payloads are REJECTED.
```
