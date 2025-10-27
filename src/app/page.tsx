"use client";

import { Button } from "@/ui/Button";
import { TextField } from "@/ui/TextField";
import { Checkbox } from "@/ui/Checkbox";
import { Radio } from "@/ui/Radio";
import { Switch } from "@/ui/Switch";
import { Chip } from "@/ui/Chip";
import { Tooltip } from "@/ui/Tooltip";

export default function Home() {
  return (
    <main className="min-h-screen w-full py-10 px-4 sm:px-8 space-y-10">
      <section className="space-y-3 max-w-md">
        <h1 className="text-xl font-semibold">TextField</h1>
        <TextField label="First name" placeholder="John" fullWidth />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          color="primary"
          fullWidth
          helperText="We’ll never share your email."
        />
        <TextField
          label="Password"
          type="password"
          variant="filled"
          color="default"
          fullWidth
        />
        <TextField
          label="Bio"
          multiline
          rows={3}
          variant="standard"
          fullWidth
          helperText="Tell us a bit about you."
        />
        <TextField
          label="With adornments"
          startAdornment={<span>@</span>}
          endAdornment={<span>.com</span>}
          fullWidth
        />
        <TextField label="Status" select fullWidth>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </TextField>
        <TextField
          label="Error state"
          error
          helperText="Invalid entry"
          fullWidth
        />
        <TextField label="Required" required fullWidth />
        <Button variant="contained" color="primary">
          Click
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Selection Controls</h2>
        <div className="flex flex-col gap-2">
          <Checkbox label="Accept Terms" defaultChecked />
          <Checkbox label="Subscribe" color="success" />
          <div className="flex items-center gap-6">
            <Radio name="gender" label="Male" defaultChecked />
            <Radio name="gender" label="Female" />
          </div>
          <div className="flex items-center gap-6">
            <Switch label="Notifications" defaultChecked />
            <Switch label="Dark Mode" color="primary" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Data Display</h2>
        <div className="flex items-center gap-3">
          <Chip label="Default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Deletable" color="error" onDelete={() => {}} />
        </div>
        <div>
          <Tooltip title="Hello tooltip!" placement="top">
            <Button>Hover me</Button>
          </Tooltip>
        </div>
      </section>
    </main>
  );
}
