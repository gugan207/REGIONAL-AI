# Supabase Setup for REGIONAL - AI

## Project Configuration

### Supabase Credentials

The following Supabase credentials must be configured in `.env.local`:

```
VITE_SUPABASE_URL=https://jvsrhqssabfechsjdivr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_OxdHhlgS6Qp9OI7dpb9w-w_otlkAydO
```

### Environment File

Create or update `D:\REGIONAL-AI\.env.local` with the above values. These are `VITE_`-prefixed variables safe for browser exposure.

**Important**: Never add service-role keys or secret keys to frontend environment variables.

### Existing Environment Values Preserved

- `GEMINI_API_KEY` - Google AI Studio key (backend only)
- `GEMINI_MODEL` - gemini-3.8-flash (backend only)
- `YOUTUBE_API_KEY` - YouTube Data API v3 key (backend only)
- All other existing `.env` configuration remains unchanged

### Configuration Verification

Run the development server to verify Supabase credentials are picked up:

```bash
npm run dev
```

The app should initialize the Supabase client and attempt session restoration. If credentials are missing, the app falls back to demo mode with in-memory state.

## Supabase Client

### Installation

The `@supabase/supabase-js` package was installed:

```bash
npm install @supabase/supabase-js
```

### Client Location

Typed Supabase client: `src/services/supabaseClient.ts`

### Key Exports

- `supabase` - Configured Supabase client (throws if not configured)
- `demoSupabase()` - Demo mode client for development without credentials
- `isSupabaseConfigured()` - Check if VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set
- `restoreSession()` - Restore session from persisted localStorage
- `signInWithPassword(email, password)` - Email/password sign-in
- `signUp(email, password)` - Email/password sign-up
- `signOut()` - Sign out with session clearance
- `onAuthStateChange(callback)` - Auth state subscription
- `getCurrentUser()` - Get current user object

### Demo Mode

When Supabase credentials are absent, the app automatically falls back to demo mode:

- App runs with in-memory state instead of crashing
- Navigation between all 14 screens works normally
- Profile data persists in URL hash and component state
- Gemini and YouTube integrations continue to work (with fallback data)
- No real authentication - all users operate in demo mode

## Database Schema

### Migrations

Version-controlled SQL migrations exist in `supabase/migrations/`:

1. `20261009001_candidate_profiles.sql` - User profile storage
2. `20261009002_candidate_progress.sql` - Workflow progress tracking
3. `20261009003_candidate_roadmaps.sql` - Generated roadmaps
4. `20261009004_candidate_resumes.sql` - Resume metadata
5. `20261009005_candidate_skill_proofs.sql` - Skill-proof records

### Tables Created

| Table | Key Columns | RLS |
|---|---|---|
| `candidate_profiles` | `id` (UUID, FK to auth.users), `education`, `region`, `target_role`, `selected_skills`, `profile_completion` | ENABLED |
| `candidate_progress` | `id` (UUID, FK to auth.users), `current_stage`, `readiness_percentage`, `saved_application_state` | ENABLED |
| `candidate_roadmaps` | `id` (UUID, FK to auth.users), `roadmap_data`, `title` | ENABLED |
| `candidate_resumes` | `id` (UUID, FK to auth.users), `resume_title`, `structured_content`, `file_path` | ENABLED |
| `candidate_skill_proofs` | `id` (UUID, FK to auth.users), `skill_name`, `verification_status` | ENABLED |

### Row Level Security

All tables have RLS enabled with owner-scoped policies:

```sql
-- Example policy for candidate_profiles
CREATE POLICY "Users can view own profile" ON candidate_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON candidate_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON candidate_profiles
  FOR UPDATE USING (auth.uid() = id);
```

Same pattern applied to all 5 tables.

### Storage (Optional)

For resume file storage, a private Supabase Storage bucket should be created with owner-scoped access policies. This is not implemented in the initial migration - resumes store metadata only.

## Authentication Flow

### Sign Up

```javascript
const { data, error } = await signUp(email, password);
```

- Calls Supabase `auth.signUp`
- On success, triggers session restoration
- Navigates to onboarding screen

### Sign In

```javascript
const { data, error } = await signInWithPassword(email, password);
```

- Calls Supabase `auth.signInWithPassword`
- On success: sets auth state, loads saved profile, navigates to onboarding
- Friendly error messages for expired credentials, wrong password, etc.

### Sign Out

```javascript
await signOut();
```

- Clears Supabase persisted session from localStorage
- Resets in-memory profile data to defaults
- Navigates to login screen

### Session Restoration

On app start / refresh:

1. `restoreSession()` attempts to read session from localStorage
2. If valid session exists: `loadSavedProfile(userId)` loads user data from `candidate_profiles`
3. If no session: user is unauthenticated, demo mode defaults apply
4. Protected data loads only after auth state is confirmed

### Email Verification

- Handled by Supabase Auth settings
- If email verification is required, users must verify before signing in
- Friendly error messages displayed if verification is pending

## Integration with Existing Screens

### Data Persistence Flow

Authenticated user data is persisted/reloaded at each screen transition:

| Screen | Data Persisted |
|---|---|
| Onboarding | Education, year, region |
| Target Role | Target role selection |
| Skill Profile | Selected skills, resume file |
| Regional Signal | Regional signals, readiness |
| Dashboard | All accumulated profile data |
| Roadmap | Roadmap generation data |
| Skill Proof | Skill verification status |
| Resume Builder | Resume metadata |

### Key Integration Points

- `loadSavedProfile(userId)` - Called after session restoration
- `syncProfileToSupabase()` - Called on profile changes
- Profile data syncs via upsert (creates or updates without overwriting existing data)
- On sign-out: in-memory data cleared, session cleared from localStorage

## Credential Protection

### What's Excluded from Git

- `.env` - Ignored by .gitignore
- `.env.local` - Ignored by .gitignore (via `*.local` pattern)
- `server/.env` - Ignored by server/.gitignore
- `server/.env.local` - Ignored by server/.gitignore

### What's Tracked

- `.env.example` - Placeholders only (tracked with `!` prefix in .gitignore)
- `server/.env.example` - Placeholders only (tracked)
- Supabase URL and publishable key in `.env.local` - NOT committed

### Frontend Security

- Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are exposed to the browser
- Never store service-role keys or secret keys in frontend variables
- All user data access protected by RLS policies at the database level
- Frontend checks supplemented by database-level RLS, never relied upon exclusively

## Migration Execution

### Apply Migrations via Supabase SQL Editor

1. Log in to Supabase Dashboard: https://app.supabase.com
2. Navigate to your project: jvsrhqssabfechsjdivr
3. Go to **SQL Editor**
4. Click **New query**
5. Copy and execute each migration file in order:

```sql
-- Migration 001
-- Run in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS candidate_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  education TEXT NOT NULL DEFAULT 'B.Tech / BE',
  year TEXT NOT NULL DEFAULT 'Final year',
  region TEXT NOT NULL DEFAULT 'Chennai',
  target_role TEXT NOT NULL DEFAULT 'Backend Developer',
  selected_skills JSONB NOT NULL DEFAULT '["Python", "SQL"]',
  gap_skill TEXT DEFAULT 'Docker',
  profile_completion INTEGER NOT NULL DEFAULT 0,
  resume_file TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ... continue with migrations 002-005

-- Trigger for auto-updating updated_at
CREATE OR REPLACE FUNCTION handle_updated_at_profiles()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON candidate_profiles
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at_profiles();
```

### Alternative: via Supabase CLI

```bash
supabase db execute --file supabase/migrations/20261009001_candidate_profiles.sql
supabase db execute --file supabase/migrations/20261009002_candidate_progress.sql
-- ... etc
```

## Test Checklist

### Automated Checks (TypeScript)

- [x] Supabase client initialization with configuration
- [x] Missing-configuration demo mode (app falls back gracefully)
- [ ] Sign-up and sign-in with real configured project (requires Supabase project)
- [ ] Sign-out and session restoration
- [ ] Profile save, refresh, and reload
- [ ] Roadmap and progress persistence
- [ ] RLS isolation between two users
- [ ] Anonymous access denial for private records

### Manual Checks (Requires Supabase Project)

1. Set up Supabase project at https://supabase.com
2. Apply the 5 migrations in SQL Editor
3. Enable RLS on all 5 tables
4. Create the storage bucket (optional, for resume files)
5. Test sign-up with real email/password
6. Test sign-out and session restoration after page refresh
7. Fill out the onboarding journey and verify data persists
8. Test with two different users to verify RLS isolation
9. Verify Gemini and YouTube API integrations still work
10. Run `npm run build` to verify production build
11. Check responsive UI at 1440, 1024, 768, and 640px breakpoints

### Checks Blocked by Missing Credentials

These tests require a live Supabase project and cannot be run without credentials:

- Sign-up with real account
- Sign-in with real password
- Session restoration after refresh
- Profile data persistence in database
- RLS isolation between users
- Gemini API calls through Supabase-backed flow
- YouTube search integration

## Remaining Manual Actions

To complete the Supabase integration, the following action is required:

1. **Create Supabase project** (if not already done) at https://supabase.com
2. **Apply database migrations** in Supabase SQL Editor
3. **Enable RLS policies** on all tables
4. **(Optional) Create private Storage bucket** for resume files

Once these actions are complete, run the full test suite to verify all integration features.

## Files Created or Modified

### New Files

- `src/services/supabaseClient.ts` - Typed Supabase client with config validation
- `supabase/migrations/20261009001_candidate_profiles.sql`
- `supabase/migrations/20261009002_candidate_progress.sql`
- `supabase/migrations/20261009003_candidate_roadmaps.sql`
- `supabase/migrations/20261009004_candidate_resumes.sql`
- `supabase/migrations/20261009005_candidate_skill_proofs.sql`
- `supabase/policies.sql` - RLS policies

### Modified Files

- `.env.local` - Supabase credentials (created)
- `src/App.tsx` - Supabase authentication integration
- `tsconfig.json` - Added `types: ["vite/client"]` for import.meta.env support
- `src/env.ts` - Environment configuration (if it existed)

### Untracked/Protected

- `.env.local` - Excluded from git via .gitignore
- `supabase/policies.sql` - Can be tracked for policy reference