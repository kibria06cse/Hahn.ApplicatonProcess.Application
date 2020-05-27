using Hahn.ApplicatonProcess.May2020.Data.Dtos;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Applicants.Commands.UpdateApplicant
{
    public class UpdateApplicantCommand : IRequest<ApplicantVM>
    {
        public ApplicantDto Applicant { get; set; }
    }
}
