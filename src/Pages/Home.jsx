import React from "react";
import { Users } from "lucide-react";

function Home() {
  //console.log("Rendering Home Component"); // Check if this logs in the console

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <Users size={64} className="mx-auto mb-6 text-blue-600" />
      <h1 className="text-4xl font-bold mb-4">Welcome to WorkForce360 </h1>
      <p className="text-lg text-gray-600 mb-12">
        A centralized platform to manage employees, streamline HR tasks, and monitor team performance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Manage</h3>
          <p className="text-gray-600">Add, edit, and delete employee records with a user-friendly dashboard.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Monitor</h3>
          <p className="text-gray-600">Keep track of employee activity, roles, and attendance in real-time.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Grow</h3>
          <p className="text-gray-600">Empower your team and boost productivity with powerful analytics.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
