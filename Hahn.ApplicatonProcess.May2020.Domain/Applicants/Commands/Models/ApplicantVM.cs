using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models
{
    public class ApplicantVM
    {
        public int Id { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
