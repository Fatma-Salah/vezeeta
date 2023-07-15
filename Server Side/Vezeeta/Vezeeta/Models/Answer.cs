﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Vezeeta.Models
{
    public partial class Answer
    {
        [Key]
        public int Dr_id { get; set; }
        [Key]
        public int Q_id { get; set; }
        [Required]
        public string description { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? create_at { get; set; }

        [ForeignKey("Dr_id")]
        [InverseProperty("Answers")]
        public virtual Doctor Dr { get; set; }
        [ForeignKey("Q_id")]
        [InverseProperty("Answers")]
        public virtual Question Q_idNavigation { get; set; }
    }
}